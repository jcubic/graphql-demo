const { ApolloServer, gql } = require('apollo-server');
const fs = require('node:fs');
const pythons = require('./pythons');
const { randomDiceRolls, randomDiceRoll } = require('./random');

/*
  schema {
    query: MyQuery
  }
  type MyQuery {
  }

*/

const typeDefs = gql`
  type Query {
    greeting: String
    names: [String]
    lorem: [String]
    randomDiceRoll: Int
    randomDiceRolls: [Int]
    eulersSeries: [Float]
    e: Float
    counter: Int
    today: DayOfWeek
    users: [User!]!
    "List of Monty Python members"
    pythons: [Python!]!
  }
  """
  ## Python
  This is type of a member of the
  [Monty Python](https://en.wikipedia.org/wiki/Monty_Python)
  """
  type Python {
    first: String!
    last: String!
  }
  """
  ## User
  This is type of a user
  """
  type User {
    full_name: String!
    nick: String
    address: Address
  }
  """
  ## Address
  This is type of the User adress
  """
  type Address {
    street: String!
    number: String
    city: String
    country: String
  }
  enum DayOfWeek {
    MON
    TUE
    WED
    THU
    FRI
    SAT
    SUN
  }
`;

const lorem = () => {
  return fs.readFileSync('lorem.txt', 'utf8').split(/\n+/).filter(Boolean);
};

const eulersSeries = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const n = i + 1;
    return (1 + 1 / n) ** n;
  });
};

let counter = 0;

const resolvers = {
  Query: {
    lorem,
    randomDiceRoll,
    randomDiceRolls,
    counter: () => ++counter,
    users: () => [
      {
        full_name: "Jakub T Jankiewicz",
        nick: "jcubic",
        adress: null
      }
    ],
    eulersSeries
  }
};

const rootValue = {
  greeting: "Hello, world!",
  e: Math.E,
  pythons,
  names: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
};

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
