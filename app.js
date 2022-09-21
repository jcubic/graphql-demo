const { ApolloServer, gql } = require('apollo-server');
const fs = require('node:fs');

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
    randomDiceRolls: [Int]
    eulersSeries: [Float]
    e: Float
    counter: Int
    today: DayOfWeek
    users: [User!]!
    pythons: [Python!]!
  }
  type Python {
    first: String!
    last: String!
  }
  type User {
    full_name: String!
    nick: String
    address: Address
  }
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
}

function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

let counter = 0;

const randomDiceRoll = (sides = 6) => Math.ceil(random_range(1, 6));

const randomArray = (count, sides = 6) => {
  return Array.from({length: count}, () => randomDiceRoll(sides));
};

const eulersSeries = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const n = i + 1;
    return (1 + 1 / n) ** n;
  });
};

const pythons = [
  {
    "first": "Graham",
    "last": "Chapman"
  },
  {
    "first": "Terry",
    "last": "Gilliam"
  },
  {
    "first": "John",
    "last": "Cleese"
  },
  {
    "first": "Terry",
    "last": "Jones"
  },
  {
    "first": "Michael",
    "last": "Palin"
  },
  {
    "first": "Eric",
    "last": "Idle"
  }
];

const resolvers = {
  Query: {
    lorem,
    randomDiceRolls: () => randomArray(random_range(3, 7)),
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
}


const server = new ApolloServer({
  typeDefs,
  rootValue,
  resolvers
});

server.listen({
  port: 3000
}).then(result => {
  console.log(`Listening on ${result.url}`);
});
