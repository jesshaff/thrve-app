const { config } = require("dotenv");
const sequelize = require("sequelize");

require("dotenv").config();

const sequelize = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
