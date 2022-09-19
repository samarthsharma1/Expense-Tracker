const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expense", "root", "S@marth12", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

