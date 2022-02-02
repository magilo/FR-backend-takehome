const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;

class Partner extends Model { }

Partner.init({
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
  modelName: 'partner'
})

module.exports = Partner;
