//'mongodb+srv://<username>:<password>@cluster0.cuszm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const MongoClient = require('mongodb').MongoClient;
const createError = require('http-errors');

const CONNECTION_URL =
  'mongodb+srv://felix:dc49r217@cluster0.cuszm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DATABASE_NAME = 'turtledb';

const connectdb = async () => {
  let database;
  try {
    const client = await MongoClient.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = await client.db(DATABASE_NAME);
    console.log('database connected');
  } catch (err) {
    throw createError(500, err.message);
  }
  return database;
};

const insert = async (turtle) => {
  const { id, name, speed, age, weightKg } = turtle;
  const db = await connectdb();
  try {
    await db.collection('turtle').insertOne({
      _id: turtle.id,
      id,
      name,
      speed,
      age,
      weightKg,
    });
  } catch (err) {
    throw createError(500, err.message);
  }
  return turtle;
};

const listAll = async () => {
  const db = await connectdb();
  try {
    const result = await db.collection('turtle').find().toArray();
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const checkExist = async (turtleName) => {
  const db = await connectdb();
  try {
    const result = await db
      .collection('turtle')
      .findOne({ name: `${turtleName}` });
    return result !== null;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const getById = async (turtleId) => {
  const db = await connectdb();
  try {
    const result = await db.collection('turtle').findOne({ id: turtleId });
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const remove = async (turtleId) => {
  const db = await connectdb();
  try {
    await db.collection('turtle').deleteOne({ id: turtleId });
  } catch (err) {
    throw createError(500, err.message);
  }
};

const update = async (turtle) => {
  const db = await connectdb();
  try {
    await db.collection('turtle').updateOne(
      { id: turtle.id },
      {
        $set: { ...turtle },
      }
    );
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { listAll, insert, checkExist, getById, remove, update };
