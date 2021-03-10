const path = require('path');
const fs = require('fs').promises;
const createError = require('http-errors');

const dataFile = path.join(__dirname, '..', 'database', 'turtles.json');

const read = async () => {
  try {
    const turtles = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(turtles);
  } catch {
    throw createError(500, 'Cannot read data from json file');
  }
};

const write = async (data) => {
  try {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 4), {
      encoding: 'utf-8',
      flag: 'w',
    });
  } catch {
    throw createError(500, 'Cannot write data to json file');
  }
};

const checkExist = async (turtleName) => {
  const turtles = await read();
  const filtered = turtles.filter((t) => t.name === turtleName);
  return filtered.length > 0;
};

const insert = async (turtle) => {
  const turtles = await read();
  turtles.push(turtle);
  await write(turtles);
  return turtle;
};

const listAll = async () => {
  return await read();
};

const getById = async (turtleId) => {
  const turtles = await read();
  return turtles.find((t) => t.id === turtleId);
};

const remove = async (turtleId) => {
  const turtles = await read();
  const filtered = turtles.filter((t) => t.id !== turtleId);
  console.log(filtered);
  await write(filtered);
};

const update = async (turtle) => {
  const turtles = await read();
  const index = turtles.findIndex((t) => t.id === turtle.id);
  turtles[index] = turtle;
  await write(turtles);
};

module.exports = { insert, checkExist, listAll, getById, remove, update };
