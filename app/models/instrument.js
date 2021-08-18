const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Instrument extends Model {};

Instrument.init({
  instrument_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
}, 
{
  sequelize: database,
  tableName: "instrument"
});

module.exports = Instrument;