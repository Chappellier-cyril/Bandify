const { Invitation, Member } = require('../models');
const { Op } = require("sequelize");
const { findByPk } = require('../models/sound');

const invitationController = {

    // Requete qui permet de voir la liste des invitations en attente de réponse de la part d' un membre

    getAllInvitations: async (req, res, next) => {
        try {
            const targetId = req.params.id;
             
            
            const invitations = await Invitation.findAll({ where: { to: targetId } , include: ['fromMember', 'toMember'], order: [['createdAt', 'ASC']] });
            res.json(invitations);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Envoyer une invitation a un membre

    sendInvitation : async (req, res, next) => {
        try {
            const [newInvitation, created] = await Invitation.findOrCreate({

            where : {[Op.or]: [{ from: req.body.from, to: req.body.to }, { from: req.body.to, to: req.body.from }]},

            defaults : {from: req.body.from, to: req.body.to, status: 0}
            
            });
            if (created) {
                const invitation = await findByPk(newInvitation.id, {
                    include: ['fromMember', 'toMember'], order: [['createdAt', 'ASC']] 
                })
                res.json(invitation);
            }else {
                res.json({message : 'invitation déja envoyé'})
            }
           

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Refuser une invitation

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

    // Accepter une invitation

    updateInvitation : async (req, res, next) => {
        try {
            
            const targetId = req.params.id;
            
            const invitationUpdate = await Invitation.findByPk(targetId, {include: ['fromMember', 'toMember'] });
            
            if (!invitationUpdate) {
                return next(); 
            }
            
            await invitationUpdate.update(req.body);
            const invit = await Invitation.findByPk(targetId, {include: ['fromMember', 'toMember'] });
            res.json(invit);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },


    // Nous appelons "Friends" quand le statut est a "1"

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

    // Non l'appelons "PendingInvitations" quand le statut est "0"

    getPendingInvitations: async (req, res, next) => {
        try {
            const targetId = req.params.id;
            
            const pendingInvitations = await Invitation.findAll({ where: { status:0, [Op.or]: [{ from: targetId }, { to: targetId }] }, include: ['fromMember', 'toMember'] });
            res.json(pendingInvitations);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    getAcceptedInvitations: async (req, res, next) => {
        try {
            const targetId = req.params.id;
            
            const acceptedInvitations = await Invitation.findAll({ where: { status:1, [Op.or]: [{ from: targetId }, { to: targetId }] }, include: ['fromMember', 'toMember'] });
            res.json(acceptedInvitations);


        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },


    


};

module.exports = invitationController;