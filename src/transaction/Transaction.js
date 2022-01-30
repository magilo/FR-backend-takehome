const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;

class Transaction extends Model { }

Transaction.init({
  payer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER,
  },
  timestamp: {
    type: Sequelize.TIME,
    unique: true,
    allowNull: false
  },
  leftover: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'transaction'
})

module.exports = Transaction;
