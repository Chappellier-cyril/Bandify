require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/routers/routers');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const expressSwagger = require('express-swagger-generator')(app);
const CLIENT_SIDE = process.env.CLIENT_SIDE || 'http://localhost:8080';
const { addMemberOnline, removeMemberOnline} = require('./sockets/users');
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

app.use(router);
//TESTS SOCKETS => CREER UN TABLEAU DE MEMBER ONLINE ET LE RENVOYER AU FRONT
io.on('connect', (socket) => {
    socket.on('isOnline', (member) => {
        console.log('member', member);
        const onlineMembers = addMemberOnline(member.id, socket.id);
        io.emit('online-members', {online: onlineMembers});
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
