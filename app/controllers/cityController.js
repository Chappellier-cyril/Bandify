const { City } = require('../models');

const cityController = {
    // Get all members
    getAllCities: async (req, res, next) => {
        try {
            const members = await City.findAll({
                include: ['department']});
            res.json(members);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    }
};

module.exports = cityController;