const express = require("express");
const { Router } = express;
const auth = require('../auth/middleware')

function gameFactory(stream) {
    const router = new Router();

  // Click card and get point in database
  router.put("/card", auth, async(req, res, next) => {

    const {user} = req

    if (!user){
      return next('No user found')
    }

    const updated = await user.update({point: 1})
    
    const action = {
      type: "CLICKCARD",
      payload: user
    }

    const string = JSON.stringify(action);
    stream.send(string)

    res.send(updated)
  })
  return router;
}

module.exports = {gameFactory}