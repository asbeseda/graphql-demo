import {} from './config'
import logger from './utils/logger';
import {ApolloServer, PubSub} from 'apollo-server';
import resolvers from './resolvers'
import DataLoader from 'dataloader';
import loaders from './loaders';
import jwt from 'jsonwebtoken';

export const start = async () => {

    //////////////////////////////////////////////////////////////////
    // Sequelize database ORM
    //////////////////////////////////////////////////////////////////
    await ( async() => {
        logger.info("Connecting database...");
        const model = require("./model");
        await model.start();
        logger.info(`Database connected.`);
    })();

    await ( async() => {
        if(process.env.DB_RECREATE === "true"){
            logger.info("Recreating database...");
            await sequelize.sync({force: true});
            logger.info("Database recreated...");
        }
    })();

    await ( async() => {
        if(process.env.DB_FILL_WITH_TESTDATA === "true") {
            logger.info(`Executing migrations on database...`);
            const migrations = require("./migrations");
            await migrations.start();
            logger.info(`All migrations finished.`);
        }
    })();

    //////////////////////////////////////////////////////////////////
    // Apollo GraphQL server
    //////////////////////////////////////////////////////////////////
    const pubsub = new PubSub();
    global.pubsub = pubsub;

    await ( async() => {
        const typeDefs = require("fs").readFileSync(__dirname+ "/schema.graphqls", "utf8");

        const apollo = new ApolloServer({
            typeDefs: typeDefs,
            resolvers,
            context: async ({req, res}) =>{
                if (req) {
                    // non-subscription calls
                    let me = null;
                    const token = req.headers['x-token'];
                    if (token) {
                        logger.debug(`Request with x-token = '${token}'.`);
                        const token_payload = await jwt.verify(token, process.env.JWT_SECRET);
                        logger.debug(`   JWT token payload: ${JSON.stringify(token_payload)}`);
                        me = await models.User.findByPk(token_payload.user_id);
                        logger.debug(`   Me = ${JSON.stringify(me)}`);
                    }
                    return {
                        models,
                        me,
                        loaders: {
                            bookById: new DataLoader(keys => loaders.loaderBooksById(keys, models)),
                            bookByAuthorId: new DataLoader(keys => loaders.loaderBooksByAuthorId(keys, models)),
                            commentByBookId: new DataLoader(keys => loaders.loaderCommentsByBookId(keys,models)),
                            authorById: new DataLoader(keys => loaders.loaderAuthorsById(keys,models)),
                            userById: new DataLoader(keys => loaders.loaderUsersById(keys,models))
                        },
                    }
                } else {
                    // we get here when we use subscription query
                    // req and res are empty
                    return {
                        models,
                        loaders: {
                            bookById: new DataLoader(keys => loaders.loaderBooksById(keys, models)),
                            bookByAuthorId: new DataLoader(keys => loaders.loaderBooksByAuthorId(keys, models)),
                            commentByBookId: new DataLoader(keys => loaders.loaderCommentsByBookId(keys,models)),
                            authorById: new DataLoader(keys => loaders.loaderAuthorsById(keys,models)),
                            userById: new DataLoader(keys => loaders.loaderUsersById(keys,models))
                        },
                    }
                }
            },
            playground: true,
            introspection: true,
            tracing: true,
            mocks: false,

            cacheControl: (process.env.CACHE_USE === 'true') ? true : false,

            cache: () => {
                if(process.env.CACHE_USE === 'true') {
                    if (process.env.CACHE_MEMCACHED_SERVERS !== "") {
                        const {MemcachedCache} = require('apollo-server-cache-memcached');
                        const servers = process.env.CACHE_MEMCACHED_SERVERS.split(",")
                        return new MemcachedCache(servers);
                    }
                }
                return null;
            },

            formatError: error => {
                logger.warn(error);
                return error;
            },
        });
        global.apollo = apollo;


        await apollo.listen().then(({url}) => {
            logger.info(`Server ready at ${url}`);
        });
    })();
}

export const stop = async () => {
    await apollo.stop();
    await sequelize.close();
}
