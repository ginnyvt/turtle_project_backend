const createError = require('http-errors');

const mysql = require('mysql');
const util = require('util');

function makeDb() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'felix',
    password: 'dc49r217',
    database: 'turtledb',
  });
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

const insert = async (turtle) => {
  const db = makeDb();
  try {
    const sql = `INSERT INTO turtle (number, name, speed, age, weightKg) VALUES (${turtle.id}, '${turtle.name}', '${turtle.speed}', ${turtle.age}, ${turtle.weightKg})`;
    await db.query(sql);
    return turtle;
  } catch (err) {
    throw createError(500, err.message);
  } finally {
    await db.close();
  }
};

const listAll = async () => {
  const db = makeDb();
  try {
    const sql = `SELECT number as id, name, speed, age, weightKg FROM turtle `;
    const result = await db.query(sql);
    const results = await JSON.parse(JSON.stringify(result));
    return results;
  } catch (err) {
    createError(500, err.message);
  } finally {
    await db.close();
  }
};

const getById = async (turtleId) => {
  const db = makeDb();
  try {
    const sql = `SELECT number as id, name, speed, age, weightKg FROM turtle WHERE number = ${turtleId}`;
    const result = await db.query(sql);
    const results = await JSON.parse(JSON.stringify(result));
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (err) {
    throw createError(500, err.message);
  } finally {
    await db.close();
  }
};

const checkExist = async (turtleName) => {
  const db = makeDb();
  try {
    const sql = `SELECT name FROM turtle WHERE name = '${turtleName}'`;
    const result = await db.query(sql);
    const results = await JSON.parse(JSON.stringify(result));
    return results.length > 0;
  } catch (err) {
    throw createError(500, err.message);
  } finally {
    await db.close();
  }
};

const remove = async (turtleId) => {
  const db = makeDb();
  try {
    const sql = ` DELETE FROM turtle WHERE number = ${turtleId} `;
    const result = await db.query(sql);
    await JSON.parse(JSON.stringify(result));
  } catch (err) {
    throw createError(500, err.message);
  } finally {
    await db.close();
  }
};

const update = async (turtle) => {
  const db = makeDb();
  try {
    const sql = ` UPDATE turtle SET name = '${turtle.name}', speed ='${turtle.speed}', age=${turtle.age} , weightKg = ${turtle.weightKg} WHERE number = ${turtle.id}  `;

    await db.query(sql);
  } catch (err) {
    throw createError(500, err.message);
  } finally {
    await db.close();
  }
};

module.exports = { insert, listAll, remove, getById, update, checkExist };
