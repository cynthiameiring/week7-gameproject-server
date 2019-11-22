const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres"; //first one is for Heroku, other one is locally

const db = new Sequelize(databaseUrl);

db.sync({ force: true })
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch(err => console.error("Unable to create tables", err));

module.exports = db;
