const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Invitation extends Model {};

Invitation.init({
  status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          isInt: true,
      }
  },
  from : {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'Member',
            key: 'id'
        }
  },
  to : {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'Member',
            key: 'id'
        }
  },
}, 
{
  sequelize: database,
  tableName: "invitation"
});

module.exports = Invitation;