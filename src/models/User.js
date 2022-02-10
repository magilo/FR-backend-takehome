const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;

/* this model is currently unused but included for future development */

class User extends Model { }

User.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
  }
}, {
  sequelize,
  modelName: 'user'
})

module.exports = User;
