require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/routers/routers');
const http = require('http');
const app = express();
const sanitizer = require('sanitizer')
const socketio = require('socket.io');
const server = http.createServer(app);
const expressSwagger = require('express-swagger-generator')(app);
const CLIENT_SIDE = process.env.CLIENT_SIDE;

const { addMemberOnline, removeMemberOnline, findUserOnline} = require('./sockets/users');

// Création du module Swagger 

let swaggerOptions = {
   swaggerDefinition: {
       info: {
           description: `API du l'application Bandify`,
           title: 'Bandify API',
           version: '1.0.0',
       },
       host: 'https://bandifyback.herokuapp.com',
       basePath: '/',
       produces: [
           "application/json"
       ],
       schemes: ['http'],
   },

   basedir: __dirname,
   files: ['./app/routers/routers.js']
};
expressSwagger(swaggerOptions);

// Création du module Socket.io

const io = socketio(server, {
    cors: {
        origin: CLIENT_SIDE,
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.static('upload'));

app.use( cors('https://bandify.netlify.app/') );
app.use(express.urlencoded({extended: true})); 

// ajout d' une méthode pour vérifier les données d'un formulaire avec sanitizer

app.use( (req, res, next) => {
    if (req.body) {
        for (let prop in req.body) {
            req.body[prop = sanitizer.escape(req.body[prop])];
        }
    }
    next();
})

app.use(router);

//TESTS SOCKETS => CREER UN TABLEAU DE MEMBER ONLINE ET LE RENVOYER AU FRONT
io.on('connect', (socket) => {
    socket.on('newMember', (newMember)=> {
        io.emit('new-member', newMember);
    });
    socket.on('isOnline', (member) => {
        const onlineMembers = addMemberOnline(member.id, socket.id);
        io.emit('online-members', {online: onlineMembers});
        socket.on('sendMessage', (message) => {
            const foundReiceverOnline = findUserOnline(message.reicever_id);
            if(foundReiceverOnline) {
                // socket.emit('notifications', {notification: 'message', message: message});
                io.to(foundReiceverOnline.socketId).emit('notifications', {notification: 'message', message: message});
            }
        });
        socket.on('isTyping', (payload) => {
            const foundReceiverOnline = findUserOnline(payload.to);
            if(foundReceiverOnline) {
                io.to(foundReceiverOnline.socketId).emit('is-typing', payload);
            }
        });
        socket.on('isNotTyping', (payload) => {
            const foundReceiverOnline = findUserOnline(payload.to);
            if(foundReceiverOnline) {
                io.to(foundReceiverOnline.socketId).emit('is-not-typing', payload);
            }
        })
        socket.on('sendInvitation', (invitation) => {
            const foundReiceverOnline = findUserOnline(invitation.to);
            if(foundReiceverOnline) {
                io.to(foundReiceverOnline.socketId).emit('notifications', {notification: 'invitation', invitation: invitation});
            }
        });
        socket.on('invitationAccepted', (payload) => {
            //prévoir le changement de status de l'invitation => 1
            const foundReiceverOnline = findUserOnline(payload.futureFriend.id);
            const invitation = {
                ...payload.invitation,
                status: 1
            }
            if(foundReiceverOnline) {
                io.to(foundReiceverOnline.socketId).emit('notifications', {notification: 'new-friend', futureFriend: payload.futureFriend, invitation} )
            }
        })
        socket.on('invitationRefused', (payload) => {
            //prévoir le changement de status de l'invitation => 2
            const foundReceiverOnline = findUserOnline(payload.refusedMember.id);
            const invitation = {
                ...payload.invitation,
                status: 2
            }
            if (foundReceiverOnline) {
                io.to(foundReceiverOnline.socketId).emit('notifications', {notification: 'no-friend', refusedMember: payload.refusedMember, invitation});
            }
        })
        socket.on('removeFromFriends', (payload) => {
            const foundReceiverOnline = findUserOnline(payload.friendOn.id);
            if(foundReceiverOnline) {
                io.to(foundReceiverOnline.socketId).emit('remove-friend', {friend: payload.friendEmit })
            }
        })
    })
    socket.on('disconnect', () => {
        const newOnlineMembers =  removeMemberOnline(socket.id);;
        io.emit('online-members', {online: newOnlineMembers});
    });
});

const port = process.env.PORT || 3000;

server.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});
