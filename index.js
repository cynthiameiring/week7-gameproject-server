const express = require("express");
const app = express();
const Room = require('./room/model')
const User = require("./user/model")

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = process.env.PORT || 4000; // this is for the port

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const Sse = require("json-sse");

//make only a stream ONE time, and dont export a stream
const stream = new Sse();
const {roomFactory} = require("./room/router");
const {gameFactory} = require('./game/router')

app.get("/stream", async(req, res) => {
  console.log('req test:', req)
  const rooms = await Room.findAll({
    include: [User]
  })

  const action = {
    type: 'ROOMS',
    payload: rooms
  }

  const string = JSON.stringify(action)

  console.log('string test:', string)

  stream.updateInit(string)
  
  stream.init(req, res);
});

const roomRouter = roomFactory(stream);
app.use(roomRouter);

const gameRouter = gameFactory(stream)
app.use(gameRouter)

const userRouter = require("./user/router");
app.use(userRouter);

const authRouter = require("./auth/router");
app.use(authRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
