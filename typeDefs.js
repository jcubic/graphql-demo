const { gql } = require('apollo-server');

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
    id: String!
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

module.exports = typeDefs;
