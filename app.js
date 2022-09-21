const { ApolloServer, gql } = require('apollo-server');
const fs = require('node:fs');


const typeDefs = gql`
  type Query {
    greeting: String
    names: [String]
    lorem: [String]
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello, world!",
    names: () => ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    lorem: () => fs.readFileSync('lorem.txt', 'utf8').split(/\n+/).filter(Boolean)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({
  port: 3000
}).then(result => {
  console.log(`Listening on ${result.url}`);
});
