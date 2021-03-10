// const repo = require('../repositories/json_repo');
const repo = require('../repositories/mysql_repo');

const createError = require('http-errors');

const handle = async (turtleId) => {
  const turtle = await repo.getById(turtleId);
  if (turtle) return turtle;
  throw createError(404, 'Cannot find turtle with that id!');
};
module.exports = { handle };
