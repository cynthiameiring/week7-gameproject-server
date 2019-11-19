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

const joinRouter = new Room();

joinRouter.put("/join/:id", (req, res, next) => {
  User.findByPk(req) // get userid from Redux state
    .then(user => user.update({ roomId: req.params.id }));
});

module.exports = { roomFactory, routerFetchRoom };
