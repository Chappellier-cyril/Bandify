const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Message extends Model {};

Message.init({
  content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: true,
      }
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
  }
  },
  sender_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'Member',
            key: 'id'
        }
  },
  receiver_id : {
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
  tableName: "message"
});

module.exports = Message;