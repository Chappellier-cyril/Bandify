const { Invitation } = require('../models');

const invitationController = {
    // Get all messages
    getAllInvitations: async (req, res, next) => {
        try {
            const invitations = await Invitation.findAll({
                });
            res.json(invitations);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Send invitation
    sendInvitation : async (req, res, next) => {
        try {
            const newMessage = await Message.create({
               status : req.body.status,
               sender_id : req.body.request_user_id,
               reicever_id : req.body.response_user_id
            });
              res.json(newMessage);

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

            // Si y'a au moins 1 membre de supprimer alors :
            if (deleteInvitation > 0) {
                res.json({message: "ok, membre supprimé"});
            } else {
                next(); // On envoie une 404
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },


    


};

module.exports = invitationController;