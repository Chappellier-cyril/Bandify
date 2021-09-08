const { Level } = require('../models');

const levelController = {

    // Récuperer tout les niveaux

    getAllLevel: async (req, res, next) => {
        try {
            const levels = await Level.findAll();
            res.json(levels);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Récuperer un niveau
    
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
