//NPM Requires
require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors');
//Project's own requires
const config  = require('./config/config').server;
//Initializations
const app = express();
const auth = require('./routes/auth')
const resource = require('./routes/resources')
const mail = require('./routes/sendEmail')
const conn_logs = require('./routes/conn_logs')
//Express Settings
app.use(cors());
//Express Middlewares
app.use(express.json()); 
//Express Routes
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {      
        if (err) {
          return res.json({ msg: 'Token inválida.' });    
        } else {
          req.decoded = decoded;
          console.log(decoded)    
          next();
        }
      });
    } else {
      res.send({ 
          msg: 'Token no proveída.' 
      });
    }
 });

app.use('/auth', auth)
app.use('/resource', rutasProtegidas, resource)
app.use('/email', rutasProtegidas, mail)
app.use('/bd', rutasProtegidas, conn_logs)
//Start Server
const PORT = process.env.PORT || config.port;

app.listen(PORT, function(){
    console.log(`Server running on ${config.host}:${PORT}`)
});