const Sequelize = require("sequelize");
const sequelize = require("../db");
const Room = require("../room/model");

const Card = sequelize.define(
  "card",
  {
    present: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    alt: {
        type: Sequelize.STRING,
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
            Card.create({alt: 'dog'})
            Card.create({alt: 'dog'})
            Card.create({alt: 'cat'})
            Card.create({alt: 'cat'})
            Card.create({alt: 'duck'})
            Card.create({alt: 'duck'})
        }
    })


module.exports = Card;