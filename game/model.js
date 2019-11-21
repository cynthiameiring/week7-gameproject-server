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


module.exports = Card;