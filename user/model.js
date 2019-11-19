const Sequelize = require("sequelize");
const sequelize = require("../db");
const Room = require("../room/model");

const User = sequelize.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: "users"
  }
);

User.belongsTo(Room);

module.exports = User;
