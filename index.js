const express = require("express");
const app = express();

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
const { roomFactory, routerFetchRoom, joinRouter } = require("./room/router");
const roomRouter = roomFactory(stream);
app.use(roomRouter);
app.use(routerFetchRoom);
app.use(joinRouter);

app.get("/stream", (req, res) => {
  stream.init(req, res);
});

const userRouter = require("./user/router");
app.use(userRouter);

const authRouter = require("./auth/router");
app.use(authRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
