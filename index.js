const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = process.env.PORT || 4000; // this is for the port

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const userRouter = require("./user/router");
app.use(userRouter);

const authRouter = require("./auth/router");
app.use(authRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
