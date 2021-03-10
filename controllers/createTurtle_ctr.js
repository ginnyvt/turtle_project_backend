const createTurtle_uc = require('../usecases/createTurtle_uc');
const createError = require('http-errors');
const invoke = async (req) => {
  if (
    !req.body.name ||
    !req.body.speed ||
    !req.body.age ||
    !req.body.weightKg
  ) {
    throw createError(400, `Inputs are not valid!`);
  }

  return await createTurtle_uc.handle(req.body);
};

module.exports = { invoke };
