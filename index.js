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

let swaggerOptions = {
   swaggerDefinition: {
       info: {
           description: 'This is Bandify API',
           title: 'Bandify API',
           version: '1.0.0',
       },
       host: 'localhost:3000',
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

const io = socketio(server, {
    cors: {
        origin: CLIENT_SIDE,
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.static('upload'));

// A Modifier pour la sécurité a voir pour la suite
app.use( cors('*') );
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
        socket.on('sendInvitation', (invitation) => {
            const foundReiceverOnline = findUserOnline(invitation.to);
            if(foundReiceverOnline) {
                socket.emit('notifications', {notification: 'invitation', invitation: invitation});
                io.to(foundReiceverOnline.socketId).emit('notifications', {notification: 'invitation', invitation: invitation});
            }
        });
    })
    socket.on('disconnect', () => {
        console.log('A member left', socket.id);
        const newOnlineMembers =  removeMemberOnline(socket.id);
        console.log(newOnlineMembers);
        io.emit('online-members', {online: newOnlineMembers});
    });
});

const port = process.env.PORT || 3000;

server.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});
