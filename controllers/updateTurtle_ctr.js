const updateTurtle_uc = require('../usecases/updateTurtle_uc');

const invoke = async (req) => {
  const turtle = { id: +req.params.turtleId, ...req.body };
  return await updateTurtle_uc.handle(turtle);
};

module.exports = { invoke };
