const database = require('../database');
const { DataTypes, Model } = require('sequelize');

class MusicStyle extends Model {};
 
MusicStyle.init({
  music_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
  sequelize: database,
  tableName: "music_style",
});

module.exports = MusicStyle;