import { ApolloServer } from 'apollo-server';

const typeDefs = `
  type Query {
    greeting: String
  }
`;

const server = new ApolloServer({
  typeDefs
});

server.listen({
  port: 4000
}).then(result => {
  console.log(`Listening on ${result.url}`);
});
