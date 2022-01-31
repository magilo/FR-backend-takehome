const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;

class Payer extends Model { }

Payer.init({
  payer: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
  }
}, {
  sequelize,
  modelName: 'payer'
})

module.exports = Payer;
