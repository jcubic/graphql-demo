import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    greeting: String
    names: [String]
  }
`;

const data = {
  greeting: "Hello, world!",
  names: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
};

const server = new ApolloServer({
  typeDefs,
  rootValue: data
});

server.listen({
  port: 4000
}).then(result => {
  console.log(`Listening on ${result.url}`);
});
