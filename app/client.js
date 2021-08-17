const { Sequelize } = require('sequelize');

// 2. Créer une instance de sequelize
const sequelize = new Sequelize({
    dialect: 'postgres',
    define: {
        timestamps: true
    },
});

// 3. Exporter l'instance de sequelize
module.exports = sequelize;