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
    },
    point: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: "users"
  }
);

User.belongsTo(Room);
// to also make a user.id column in the Room table
// and to use the inclusion option in findAll
Room.hasMany(User)


module.exports = User;
