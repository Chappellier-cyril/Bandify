const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  dialectOptions: {
    options: {
      requestTimeout:1000000,
    }
  },
  // logging: false,
  pool: {
    acquire: 1000000,
  }
});

module.exports = sequelize;