npm init
npm --save-dev install @babel/core @babel/node @babel/polyfill @babel/preset-env @babel/register
npm --save install graphql apollo-server  

добавить в package.json 
  "scripts": {
    "start": "babel-node src/index.js"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }

положить схему в src/schema.graphqls

добавить в src/index.js
    import {ApolloServer} from 'apollo-server'
    const typeDefs = require("fs").readFileSync(__dirname+ "/schema.graphqls", "utf8");
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        playground: true,
        introspection: true,
        mocks: true,
    });
    apolloServer.listen();

npm start

Перейти http://localhost:4000/

Пробуем 
    query {
        authors {
        id, name
        books {
          id, title, releaseDate
          comments {
            id, content, createdAt
            user {
              id, name
            }
          }
        }
      }
    }
