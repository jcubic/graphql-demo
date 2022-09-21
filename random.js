
const randomDiceRoll = (sides = 6) => Math.ceil(random_range(1, sides));
const randomDiceRolls = (sides = 6) => randomArray(random_range(3, 7), sides);

const randomArray = (count, sides = 6) => {
  return Array.from({length: count}, () => randomDiceRoll(sides));
};

function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
  randomDiceRoll,
  randomDiceRolls
};
