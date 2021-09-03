const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class Sound extends Model {};
 
Sound.init({
  key: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Member',
        key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
  }
},
{
  sequelize: database,
  tableName: "sound",
  
});

module.exports = Sound;
