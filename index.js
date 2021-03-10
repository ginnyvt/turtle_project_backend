const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const createTurtle_ctr = require('./controllers/createTurtle_ctr');
const listTurtles_ctr = require('./controllers/listTurtles_ctr');
const getTurtle_ctr = require('./controllers/getTurtle_ctr');
const updateTurtle_ctr = require('./controllers/updateTurtle_ctr');
const deleteTurtle_ctr = require('./controllers/deleteTurtle_ctr');

app.use(bodyParser.json());
app.use(cors());

app.post('/turtles', async (req, res) => {
  try {
    const data = await createTurtle_ctr.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

app.get('/turtles', async (req, res) => {
  try {
    const data = await listTurtles_ctr.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(err);
  }
});

app.get('/turtles/:turtleId', async (req, res) => {
  try {
    const data = await getTurtle_ctr.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

app.delete('/turtles/:turtleId', async (req, res) => {
  try {
    const data = await deleteTurtle_ctr.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

app.patch('/turtles/:turtleId', async (req, res) => {
  try {
    const data = await updateTurtle_ctr.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const sendSuccessResponse = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

const sendErrorResponse = (res, error) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(error.statusCode);
  res.end(error.message);
  // console.log(error);
};
