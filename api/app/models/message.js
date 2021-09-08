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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  sender_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
        references: {
            model: 'Member',
            key: 'id'
        }
  },
  reicever_id : {
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
  tableName: 'message'
});

module.exports = Message;