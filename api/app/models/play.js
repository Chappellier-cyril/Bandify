const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Play extends Model {};

Play.init({

}, {
  sequelize: database,
  tableName: 'user_has_instrument_level',
});

module.exports = Play;