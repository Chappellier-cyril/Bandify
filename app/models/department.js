const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Department extends Model {};

Department.init({
  department_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.INTEGER,
      validate: {
          isInt: true,
      }
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Region',
        key: 'id'
    }
}
}, {
  sequelize: database,
  tableName: "department"
});

 
  

module.exports = Department;