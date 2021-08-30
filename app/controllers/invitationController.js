const { Invitation, Member } = require('../models');
const { Op } = require("sequelize");

const invitationController = {
    // Get all invitations

    // Requete qui permet de voir la liste des invitations en attente de réponse de la part d' un membre

    getAllInvitations: async (req, res, next) => {
        try {
            const targetId = req.params.id;
            
            
            const invitations = await Invitation.findAll({ where: { to: targetId } , include: ['fromMember', 'toMember'] });
            res.json(invitations);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Create an invitation
    sendInvitation : async (req, res, next) => {
        try {
            const newInvitation = await Invitation.create({
               status: req.body.status,
               from: req.body.from,
               to: req.body.to
            });
              res.json(newInvitation);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    deleteInvitation: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const deleteInvitation = await Invitation.destroy({
                where: {
                    id: targetId
                }
            });

        
            if (deleteInvitation > 0) {
                res.json({message: "invitation supprimé"});
            } else {
                next();
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    updateInvitation : async (req, res, next) => {
        try {
            
            const targetId = req.params.id;
            console.log(targetId)
            
            const invitationUpdate = await Invitation.findByPk(targetId);
            console.log(invitationUpdate)
            
            if (!invitationUpdate) {
                return next(); 
            }
            
            await invitationUpdate.update(req.body);
            
            res.json(invitationUpdate);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },

    getAllFriends: async (req, res, next) => {
        try {
            const targetId = req.params.id;
            
            const friends = await Invitation.findAll({
                where: {
                    status:1,
                    [Op.or]: [{ from: targetId }, { to: targetId }]
                },
                include: [{
                    association: 'fromMember',
                    include: ['city', 'styles', {
                        association: 'plays',
                        include: ['level', 'instrument']
                    }],
                    attributes: {
                        exclude: ['user_password']
                    }
                }, {
                    association: 'toMember',
                    include: ['city', 'styles', {
                        association: 'plays',
                        include: ['level', 'instrument']
                    }],
                    attributes: {
                        exclude: ['user_password']
                    }
                }]});
            res.json(friends);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    getPendingInvitations: async (req, res, next) => {
        try {
            const targetId = req.params.id;
            
            const pendingInvitations = await Invitation.findAll({ where: { status:0, from: targetId }, include: ['fromMember', 'toMember'] });
            res.json(pendingInvitations);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },


    


};

module.exports = invitationController;