// const repo = require('../repositories/json_repo');
// const repo = require('../repositories/mysql_repo');
const repo = require('../repositories/mongo_repo');

const createError = require('http-errors');

const handle = async (turtleId) => {
  const foundTurtle = await repo.getById(turtleId);
  if (foundTurtle) {
    await repo.remove(foundTurtle.id);
    return { message: 'Turtle is removed completedly!', turtle: foundTurtle };
  } else {
    throw createError(404, 'Cannot find the turtle with that id!');
  }
};

module.exports = { handle };
