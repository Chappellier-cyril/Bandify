const { Level } = require('../models');

const levelController = {
    // Get all levels

    getAllLevel: async (req, res, next) => {
        try {
            const levels = await Level.findAll();
            res.json(levels);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one Level
    getOneLevel : async (req, res, next) => {
        try {
            const targetId = req.params.id;
            const level = await Level.findByPk(targetId);

            if (level) {
                res.json(level);
                
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
}

module.exports = levelController;
