require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./app/routers/routers');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
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
expressSwagger(options)

app.use(express.json());
app.use(express.static('upload'));
// A Modifier pour la sécurité a voir pour la suite
app.use( cors('*') );
   
app.use(express.urlencoded({extended: true})); 

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});