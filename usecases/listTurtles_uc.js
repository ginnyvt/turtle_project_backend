const createError = require('http-errors');

// const json_repo = require('../repositories/json_repo');
const repo = require('../repositories/mysql_repo');

const handle = async () => {
  return await repo.listAll();
};
module.exports = { handle };
