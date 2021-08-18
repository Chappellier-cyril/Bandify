const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class City extends Model {};

City.init({
  city_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  zipcode: {
      type: DataTypes.INTEGER,
      validate: {
          isInt: true,
      }
  },
  department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Department',
          key: 'id'
      }
  }
}, {
  sequelize: database,
  tableName: "city"
});

module.exports = City;