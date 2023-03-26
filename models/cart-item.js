const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cardItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    alllowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;