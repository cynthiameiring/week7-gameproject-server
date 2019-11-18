const Sequelize = require("sequelize");
const sequelize = require("../db");

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

module.exports = User;
