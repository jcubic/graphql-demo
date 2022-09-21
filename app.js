const { ApolloServer, gql } = require('apollo-server');
const fs = require('node:fs');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const rootValue = require('./rootValue');

const server = new ApolloServer({
  typeDefs,
  rootValue,
  resolvers,
  introspection: true
});

server.listen({
  port: 3000
}).then(result => {
  console.log(`Listening on ${result.url}`);
});
