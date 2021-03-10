const listTurtles_uc = require('../usecases/listTurtles_uc');

const invoke = async (req) => {
  return await listTurtles_uc.handle();
  // console.log(turtleId, typeof turtleId);
};
module.exports = { invoke };
