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
    validate: {
      min: 0
    }
  },
  timestamp: {
    type: Sequelize.TIME,
    unique: true,
    allowNull: false
  },
  spent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'transaction'
})

module.exports = Transaction;
