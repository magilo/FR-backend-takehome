const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;

class User extends Model { }

User.init({
  balance: {
    type: Sequelize.INTEGER,
  }
}, {
  sequelize,
  modelName: 'user'
})

module.exports = User;
