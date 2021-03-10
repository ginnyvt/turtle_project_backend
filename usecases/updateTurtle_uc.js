// const repo = require('../repositories/json_repo');
// const repo = require('../repositories/mysql_repo');
const repo = require('../repositories/mongo_repo');

const createError = require('http-errors');

const Turtle = require('../entities/Turtle');

const handle = async (turtle) => {
  const foundTurtle = await repo.getById(turtle.id);

  if (foundTurtle) {
    const checkName = await repo.checkExist(turtle.name);
    if (!checkName) {
      const updatedTurtle = new Turtle(
        foundTurtle.id,
        turtle.name || foundTurtle.name,
        turtle.speed || foundTurtle.speed,
        turtle.age || foundTurtle.age,
        turtle.weightKg || foundTurtle.weightKg
      );
      await repo.update(updatedTurtle);
      return {
        message: 'Turtle is updated successfully',
        turtle: updatedTurtle,
      };
    } else {
      throw createError(409, `The turtle's name already exists!`);
    }
  } else {
    throw createError(404, `Cannot find turtle with that id!`);
  }
};

module.exports = { handle };
