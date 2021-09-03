const { MusicStyle } = require('../models');

const musicStylesController = {

    // Get all music styles
    getAllMusicStyles: async (req, res, next) => {
        try {
            const musicStyles = await MusicStyle.findAll({
                order: ['music_name'],
                include: ['members']
            });
            res.json(musicStyles);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one music style
    getOneMusicStyle: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const musicStyles = await MusicStyle.findByPk(targetId);

            if (musicStyles) {
                res.json(musicStyles);
                
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },


};

module.exports = musicStylesController;