const { Invitation, Member } = require('../models');

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

    sendInvitation : async (req, res, next) => {
        try {
            const newInvitation = await Invitation.create({
               status : req.body.status,
               sender_id : req.body.request_user_id,
               reicever_id : req.body.response_user_id
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

    acceptInvitation : async (req, res, next) => {
        try {
            
            const targetId = req.params.id;
            
            const memberToUpdate = await Invitation.findByPk(targetId);
            
            if (!memberToUpdate) {
                return next(); 
            }
            
            await memberToUpdate.update(req.body);
            
            res.json(memberToUpdate);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },


    


};

module.exports = invitationController;