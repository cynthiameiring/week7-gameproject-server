const express = require("express");
const Room = require("./model");
const User = require('../user/model')
const { Router } = express;

function roomFactory(stream) {
  const router = new Router();

  router.post('/room', async(req, res)=>{
    const room = await Room.create(req.body)
    
    const action = {
      type: 'ADDROOM',
      payload: room
    }

    const string = JSON.stringify(action)

    stream.send(string)

    // For testing
    res.send(room)

  })

  /* router.post("/room", (req, res) => {
    Room.create(req.body).then(room => {
      const data = JSON.stringify(room);
      stream.send(data);
      res.send(room);
    });
  }); */

  /* router.get("/", (req, res, next) => {
    Room.findAll()
      .then(room => res.json(room))
      .catch(next);
  }); */

  router.put("/join/:id", (req, res, next) => {
    const roomId = req.params.id
    console.log('req.params.id',roomId)
    console.log('req.body', req.body)
    User
      .findByPk(req.body.userId) 
      .then(user => {
        if(!user){
          res.status(404).end()
        }else{
          user
            .update({roomId: roomId})
            .then(user => res.status(200).json(user))
        }
      })
      .catch(next)
    })
    
 
  return router;
}

/* const routerFetchRoom = new Router();

routerFetchRoom.get("/", (req, res, next) => {
  Room.findAll()
    .then(room => res.json(room))
    .catch(next);
});

const joinRouter = new Router(); */

/* joinRouter.put("/join/:id", (req, res, next) => {
  User.findByPk(req) // get userid from Redux state
    .then(console.log('req', req))
    .then(console.log('req.params.id', req.params.id))
    .then(user => user.update({ roomId: req.params.id }))
    .then(user => res.status(200).json(user));
}); */

//For testing
/* joinRouter.put("/join/:id", (req, res, next) => {
  const roomId = req.params.id
  console.log('req.params.id',roomId)
  console.log('req.body', req.body)
  User
    .findByPk(req.body.userId) 
    .then(user => {
      if(!user){
        res.status(404).end()
      }else{
        user
          .update({roomId: roomId})
          .then(user => res.status(200).json(user))
      }
    })
    .catch(next)
  }) */

module.exports = { roomFactory }
