const { Message } = require('../models');
const { Op } = require("sequelize");

const messageController = {
    
    // Récuperer tout les messages

    getAllMessages: async (req, res, next) => {

        const targetId = req.params.id;
        try {
            const messages = await Message.findAll({ where: { [Op.or]: [{ reicever_id: targetId }, { sender_id: targetId }] }, include: ['Receiver', 'Sender'], order: [['createdAt', 'ASC']] });
            res.json(messages);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
    
    // Envoyer un message entre deux membres

    sendMessage: async (req, res, next) => {
        try {
            const newMessage = await Message.create({
               content: req.body.content,
               status : req.body.status,
               sender_id : req.body.sender_id,
               reicever_id : req.body.reicever_id
            });
            const message = await Message.findByPk(newMessage.id, {include: ['Receiver', 'Sender'], order: [['createdAt', 'ASC']] })
              res.json(message);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Lire un message envoyé d' un membre a un autre selon l' id

    readMessage: async (req, res, next) => {
        try {
            const messageTarget = req.params.id;

            const messageInc = await Message.findByPk(messageTarget);

            if(messageInc) {
                res.json(messageInc);

            } else {
                next();
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },


    // Passer le statut de false a true quand un message est lu
    
    updateMessageStatus : async (req, res, next) => {
        try {
            
            const targetId = req.params.id;
            
            const updateStatus = await Message.findByPk(targetId);
            
            await updateStatus.update({status : true});
            
            res.json(updateStatus);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    }
};

module.exports = messageController;