const { randomDiceRolls, randomDiceRoll } = require('./random');

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

module.exports = resolvers;
