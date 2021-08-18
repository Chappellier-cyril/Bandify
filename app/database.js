const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: false
      }
    })

module.exports = sequelize;