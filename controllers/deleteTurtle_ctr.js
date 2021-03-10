const deleteTurtle_uc = require('../usecases/deleteTurtle_uc');

const invoke = async (req) => {
  const turtleId = +req.params.turtleId;
  return await deleteTurtle_uc.handle(turtleId);
};

module.exports = { invoke };
