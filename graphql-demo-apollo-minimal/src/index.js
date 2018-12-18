import {ApolloServer} from 'apollo-server'

const typeDefs = require("fs").readFileSync(__dirname+ "/schema.graphqls", "utf8");
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    playground: true,
    introspection: true,
    mocks: true,
});
apolloServer.listen();

