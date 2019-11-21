const express = require("express");
const { Router } = express;
const auth = require('../auth/middleware')
const User = require('../user/model')
const Room = require("../room/model");

function gameFactory(stream) {
    const router = new Router();

  // Click on button and increment 1 point in database
  router.put("/card", auth, async(req, res, next) => {

    const {user} = req

    if (!user){
      return next('No user found')
    }

    console.log('user', user)
    console.log('user.point', user.point)
    let Point = user.point
    console.log('Is point a number? ', Point)
    let NewPoint = Point +1
    console.log('new point', NewPoint)
    const updated = await user.update({
      point: NewPoint
    })

    const rooms = await Room.findAll({include: [User]})

    const action = {
      type: "ROOMS",
      payload: rooms
    }

    console.log({ action });

    const string = JSON.stringify(action);
    stream.send(string)

    res.send(updated)
  })
  return router;
}

module.exports = {gameFactory}