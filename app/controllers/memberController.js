const { Member } = require('../models');

const memberController = {
    // Get all members
    getAll: async (req, res, next) => {
        try {

            const members = await Member.findAll();
            
            res.json(members);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one member
    getOne: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const member = await Member.findByPk(targetId);

            // Soit le membre existe : Soit il n'existe pas
            if (member) {
                res.json(member);
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Create a member
    create: async (req, res, next) => {
        try {
            
            const newMember = await Member.create(req.body);

            res.json(newMember);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

};

module.exports = memberController;