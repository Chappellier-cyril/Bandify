const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Level extends Model {};

Level.init({
  level_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  
}, {
  sequelize: database,
  tableName: "level"
});

module.exports = Level;