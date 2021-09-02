const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;