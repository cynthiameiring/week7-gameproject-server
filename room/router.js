//const express = require("express");
const Room = require("./model");
const { Router } = require("express");

function roomFactory(stream) {
  const router = new Router();

  router.post("/room", (req, res) => {
    Room.create(req.body).then(room => {
      const data = JSON.stringify(room);
      stream.send(data);
      res.send(room);
    });
  });
  return router;
}

const routerFetchRoom = new Router();

routerFetchRoom.get("/", (req, res, next) => {
  Room.findAll()
    .then(room => res.json(room))
    .catch(next);
});

module.exports = { roomFactory, routerFetchRoom };
