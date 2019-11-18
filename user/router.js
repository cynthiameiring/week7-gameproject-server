const { Router } = require("express");
const User = require("./model");
const router = new Router();
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).end("Email or password not provided");
  }
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  User.create(user)
    .then(user => res.json(user))
    .catch(next);
});

module.exports = router;
