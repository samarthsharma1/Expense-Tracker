const Sequelize = require('sequelize');

const sequelize = require('./database');

const Expense = sequelize.define('expenses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount:{
  type : Sequelize.STRING,

  }, 
  description:{
    type:Sequelize.STRING,


  },
  category:{
    type:Sequelize.STRING,

  }
});

module.exports = Expense;