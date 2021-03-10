const getTurtle_uc = require('../usecases/getTurtle_uc');

const invoke = async (req) => {
  const turtleId = +req.params.turtleId;
  return await getTurtle_uc.handle(turtleId);
  // console.log(turtleId, typeof turtleId);
};
module.exports = { invoke };
