require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const router = require('./app/routers/routers');

const app = express();
app.use(express.json());

// A Modifier pour la sécurité a voir pour la suite
app.use( cors('*') );

const jwtSecret = process.env.JWT_SECRET;

app.get('/jwt', (req, res) => {
   res.json({
     token: jsonwebtoken.sign({ user: process.env.JWT_USER }, jwtSecret)
   });
 });

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));
   
app.use(express.urlencoded({extended: true})); 

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});