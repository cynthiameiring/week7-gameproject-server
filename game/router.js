const express = require("express");
const { Router } = express;
const auth = require('../auth/middleware')
const User = require('../user/model')
const Room = require("../room/model");
const Card = require('./model')

function gameFactory(stream) {
  const router = new Router();

  // update present value to database
  router.put('/remove', async(req, res)=>{
    console.log('WHAT IT REQ.BODY?', req.body)
    const updated = await Card
      .update({present:false},{where: {alt: req.body.alt}})
      .then(_ => res.status(200))

    const rooms = await Room.findAll({include:[User, Card]})

    const action = {
      type: 'ROOMS',
      payload: rooms
    }

    const string = JSON.stringify(action);
    stream.send(string)
    res.send(updated)
  })

  // Increment 1 point in database
  router.put("/getonepoint", auth, async(req, res, next) => {

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

    const rooms = await Room.findAll({include: [User, Card]})

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