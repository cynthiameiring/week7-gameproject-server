const Sequelize = require("sequelize");
const sequelize = require("../db");
const Room = require("../room/model");

const Card = sequelize.define(
  "card",
  {
    present: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    tableName: "cards"
  }
);

Card.belongsTo(Room);
Room.hasMany(Card)

// Check if card table has 6 rows already

Card
    .findAndCountAll()
    .then((res) => {
        console.log('res.count test:', res.count)
        if(res.count !== 6){
            Card.create({})
            Card.create({})
            Card.create({})
            Card.create({})
            Card.create({})
            Card.create({})
        }
    })


module.exports = Card;