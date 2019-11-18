const { Router } = require("express");
const { toJWT, toData } = require("./jwt");

const router = new Router();
const User = require("../user/model");
const auth = require("./middleware");
const bcrypt = require("bcrypt");

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(entity => {
        console.log("req.body.password test:", req.body.password);
        console.log("entity.password test:", entity.password);

        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong/unknown user"
        });
      });
  }
});

//Secret-endpoint for login test
// router.get("/secret-endpoint", auth, (req, res) => {
//   res.send({
//     message: `Thanks for visiting the secret endpoint ${req.user.email}.`
//   });
// });

module.exports = router;
