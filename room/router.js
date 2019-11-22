const express = require("express");
const Room = require("./model");
const User = require("../user/model");
const Card = require("../game/model");
const { Router } = express;
const auth = require("../auth/middleware");

function roomFactory(stream) {
  const router = new Router();

  router.post("/room", async (req, res, next) => {
    try {
      const room = await Room.create(req.body);

      await Card.create({ alt: "dog", roomId: room.id });
      await Card.create({ alt: "dog", roomId: room.id });
      await Card.create({ alt: "cat", roomId: room.id });
      await Card.create({ alt: "sun", roomId: room.id });
      await Card.create({ alt: "duck", roomId: room.id });
      await Card.create({ alt: "cat", roomId: room.id });
      await Card.create({ alt: "pig", roomId: room.id });
      await Card.create({ alt: "bird", roomId: room.id });
      await Card.create({ alt: "fish", roomId: room.id });
      await Card.create({ alt: "bird", roomId: room.id });
      await Card.create({ alt: "pig", roomId: room.id });
      await Card.create({ alt: "fish", roomId: room.id });
      await Card.create({ alt: "sun", roomId: room.id });
      await Card.create({ alt: "duck", roomId: room.id });
      await Card.create({ alt: "moon", roomId: room.id });
      await Card.create({ alt: "moon", roomId: room.id });

      const action = {
        type: "ADDROOM",
        payload: room
      };

      const string = JSON.stringify(action);

      stream.send(string);

      // For testing
      res.send(room);
    } catch (error) {
      next(error);
    }
  });

  router.put("/join/:name", auth, async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return next("No user found");
    }

    const { name } = req.params;

    const room = await Room.findOne({ where: { name } });
    const updated = await user.update({ roomId: room.id });
    const rooms = await Room.findAll({ include: [User, Card] });

    const action = {
      type: "ROOMS",
      payload: rooms
    };

    const string = JSON.stringify(action);
    stream.send(string);

    res.send(updated);
  });

  return router;
}

module.exports = { roomFactory };
