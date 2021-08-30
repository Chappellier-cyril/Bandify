const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    options: {
      requestTimeout:1000000,
      ssl: true
    }
  },
  logging: false,
  pool: {
    acquire: 1000000,
  }
});

module.exports = sequelize;