const { Router } = require("express");
const User = require("./model");
const router = new Router();
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  console.log("route test");
  if (!req.body.username || !req.body.password) {
    res.status(400).end("username or password not provided");
  }
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  User.create(user)
    .then(user => res.json(user))
    .catch(next);
});

module.exports = router;
