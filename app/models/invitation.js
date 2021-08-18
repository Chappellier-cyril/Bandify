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
  request_user_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'Member',
            key: 'id'
        }
  },
  response_user_id : {
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