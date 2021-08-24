const { Message } = require('../models');

const messageController = {
    // Get all messages
    getAllMessages: async (req, res, next) => {
        try {
            const messages = await Message.findAll({
                });
            res.json(messages);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
    
    // Create a message
    createMessage: async (req, res, next) => {
        try {
            const newMessage = await Message.create({
               content: req.body.content,
               status : req.body.status,
               sender_id : req.body.sender_id,
               reicever_id : req.body.reicever_id
            });
              res.json(newMessage);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    readMessage : async (req, res, next) => {
        try {
            const newMessage = await Message.create({
               content: req.body.content,
               status : req.body.status,
               sender_id : req.body.sender_id,
               reicever_id : req.body.reicever_id
            });
              res.json(newMessage);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

};

module.exports = messageController;