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
      type: DataTypes.TEXT,
  },
  department_code: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
          model: 'Department',
          key: 'code'
      }
  }
}, {
  sequelize: database,
  tableName: "city"
});

module.exports = City;