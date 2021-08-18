// Creer un premier controller pour tester les members

const { Member } = require('../models');

const memberController = {

    getAll: async (req, res, next) => {
        try {

            const members = await Member.findAll();
            
            res.json(members);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    }

};

module.exports = memberController;