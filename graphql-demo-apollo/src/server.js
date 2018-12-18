import {} from './config'
import logger from './utils/logger';
import express from 'express';
import compression from 'compression';
import {ApolloServer, PubSub} from 'apollo-server-express';
import {ApolloEngine} from 'apollo-engine';
import services from './services'
import resolvers from './resolvers'
import DataLoader from 'dataloader';
import loaders from './loaders';
import jwt from 'jsonwebtoken';

// Create Express Server
export const createExpressApp = () => {
    const expressApp = express();
    expressApp.use(compression());
    global.expressApp = expressApp;
    return expressApp;
}

// Get user by JWT token from request
export const getMeFromReq = async (req) => {
    let me = null;
    const token = req.headers['x-token'];
    if (token) {
        logger.debug(`Request with x-token = '${token}'.`);
        const token_payload = await jwt.verify(token, process.env.JWT_SECRET);
        logger.debug(`   JWT token payload: ${JSON.stringify(token_payload)}`);
        me = await models.User.findByPk(token_payload.user_id);
        logger.debug(`   Me = ${JSON.stringify(me)}`);
    }
    return me;
}

// Create Apollo GraphQL Server
export const createApolloServer = () => {
    const typeDefs = require("fs").readFileSync(__dirname+ "/schema.graphqls", "utf8");

    const dataLoaders = {
        bookById: new DataLoader(keys => loaders.loaderBooksById(keys)),
        bookByAuthorId: new DataLoader(keys => loaders.loaderBooksByAuthorId(keys)),
        commentByBookId: new DataLoader(keys => loaders.loaderCommentsByBookId(keys)),
        authorById: new DataLoader(keys => loaders.loaderAuthorsById(keys)),
        userById: new DataLoader(keys => loaders.loaderUsersById(keys))
    }
    global.dataLoaders = dataLoaders;

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,

        context: async ({req, res}) => {
            return {
                me: (req) ? await getMeFromReq(req) : null
            }
        },

        playground: true,
        introspection: true,
        mocks: false,

        // Enabling tracing and cacheControl
        tracing: true,
        cacheControl: true,

        // Using Engine Proxy (running separately)
        engine: false,

        formatError: error => {
            logger.warn(error);
            return error;
        },
    });

    global.apolloServer = apolloServer;
    return apolloServer;
}

// Init Apollo GraphQL server directly
export const runApolloServer = (graphql_port, expressApp, apolloServer) => {
    return new Promise(function(resolve, reject) {
        const expressHttpServer =  expressApp.listen({port: graphql_port}, () => {
            logger.info(`Apollo GraphQL Server are fully ready at http://localhost:${graphql_port}${apolloServer.graphqlPath}`);
            resolve(true);
        });
        global.expressHttpServer = expressHttpServer;
    });
}

// Init Apollo Engine as proxy for GraphQL server
export const runApolloServerWithEngine = (graphql_port, expressApp, apolloServer) => {
    return new Promise(function(resolve, reject) {
        const apolloEngine = new ApolloEngine({
            apiKey: process.env.ENGINE_API_KEY,
            logging: {level: process.env.ENGINE_LOGGING_LEVEL},  // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
            stores: [{
                name: 'inMemEmbeddedCache',
                inMemory: {cacheSize: 104857600},  // 100 MB; defaults to 50MB.
            }],
            queryCache: {
                publicFullQueryStore: 'inMemEmbeddedCache',
            },
        });
        apolloEngine.listen({port: graphql_port, expressApp: expressApp}, () => {
            logger.info(`Apollo GraphQL Server with Engine proxy are fully ready at http://localhost:${graphql_port}${apolloServer.graphqlPath}`);
            resolve(true);
        });
        global.apolloEngine = apolloEngine;
    });
}

export const start = async () => {
    //////////////////////////////////////////////////////////////////
    // Subscription subsystem
    //////////////////////////////////////////////////////////////////
    const pubsub = new PubSub();
    global.pubsub = pubsub;

    //////////////////////////////////////////////////////////////////
    // Sequelize database ORM
    //////////////////////////////////////////////////////////////////
    await ( async () => {
        logger.info("Connecting database...");
        const model = require("./model");
        await model.start();
        logger.info(`Database connected.`);
    })();

    await ( async () => {
        if(process.env.DB_RECREATE === "true"){
            logger.info("Recreating database...");
            await sequelize.sync({force: true});
            logger.info("Database recreated...");
        }
    })();

    await ( async () => {
        if(process.env.DB_FILL_WITH_TESTDATA === "true") {
            logger.info(`Executing migrations on database...`);
            const migrations = require("./migrations");
            await migrations.start();
            logger.info(`All migrations finished.`);
        }
    })();

    //////////////////////////////////////////////////////////////////
    // Apollo GraphQL Server with Apollo Engine (via proxy)
    //  https://www.apollographql.com/docs/references/engine-proxy.html
    //////////////////////////////////////////////////////////////////
    await ( async () => {
        // Create Apollo GraphQL Server
        const apolloServer = createApolloServer();

        // Apply Express as middleware for Apollo Server
        const expressApp = createExpressApp();
        apolloServer.applyMiddleware({app: expressApp});

        // Start Apollo GraphQL Server
        const graphql_port = process.env.GRAPHQL_PORT;
        if(process.env.USE_APOLLO_ENGINE === "true")
            // Init Apollo Engine as proxy for GraphQL server
            await runApolloServerWithEngine(graphql_port, expressApp, apolloServer);
        else
            // Init Apollo GraphQL server directly
            await runApolloServer(graphql_port, expressApp, apolloServer);

    })();
}

export const stop = async () => {
    if(global.apolloEngine != undefined) {
        await ( async () => {
            // Wait some sec before exit for engine to post data to server
            return new Promise(resolve => {setTimeout(resolve, process.env.ENGINE_STOP_TIMEOUT_SEC * 1000)});
        })();
        await global.apolloEngine.stop();
    }
    if(global.expressHttpServer != undefined)
        await global.expressHttpServer.close();
    await global.sequelize.close();
}
