require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/routers/routers');

const app = express();
app.use(express.json());

// A Modifier pour la sécurité a voir pour la suite
app.use( cors('*') );
   
app.use(express.urlencoded({extended: true})); 

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});