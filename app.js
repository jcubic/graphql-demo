const { ApolloServer, gql } = require('apollo-server');
const fs = require('node:fs');


const typeDefs = gql`
  type Query {
    greeting: String
    names: [String]
    lorem: [String]
    randomDiceRolls: [Int]
    counter: Int
  }
`;

const lorem = () => {
  return fs.readFileSync('lorem.txt', 'utf8').split(/\n+/).filter(Boolean);
}

function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

let counter = 0;

const randomDiceRoll = (sides = 6) => Math.ceil(random_range(1, 6));

const randomArray = (count, sides = 6) => {
  return Array.from({length: count}, () => randomDiceRoll(sides));
};

const resolvers = {
  Query: {
    greeting: () => "Hello, world!",
    names: () => ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    lorem,
    randomDiceRolls: () => randomArray(random_range(3, 7)),
    counter: () => ++counter
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
