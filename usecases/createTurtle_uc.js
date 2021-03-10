// const json_repo = require('../repositories/json_repo');
const repo = require('../repositories/mysql_repo');

const createError = require('http-errors');

const Turtle = require('../entities/Turtle');

const handle = async (validatedTurtle) => {
  const { name, speed, age, weightKg } = validatedTurtle;
  const existTurtle = await repo.checkExist(name);

  if (!existTurtle) {
    const newTurtle = new Turtle(Date.now(), name, speed, age, weightKg);
    return await repo.insert(newTurtle);
  } else {
    throw createError(409, 'The turtle already exists!');
  }
};

module.exports = { handle };
