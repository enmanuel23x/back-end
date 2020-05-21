//NPM Requires
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const sameSiteCookieMiddleware = require('express-samesite-default').sameSiteCookieMiddleware;
//Crt
var options = {
    key: fs.readFileSync('./config/private.key'),
    cert: fs.readFileSync('./config/combined.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
//Project's own requires
const config  = require('./config/config').server;
//Initializations
const app = express();
//const auth = require('./routes/auth')
const rg = require('./routes/resource_guru')
const mail = require('./routes/sendEmail')
const conn_logs = require('./routes/conn_logs')
//Express Settings
app.use(cors());
app.use(sameSiteCookieMiddleware());
//Express Middlewares
app.use(express.json()); 
//Express Routes

//app.use('/auth', auth)
app.use('/rg', rg)
app.use('/email',mail)
app.use('/bd',conn_logs)
//Start Server
const PORT = process.env.PORT || config.port;
var server = https.createServer(options, app).listen(PORT, function(){
    console.log(`Server running on ${config.host}:${PORT}`)
});