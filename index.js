//NPM Requires
const express = require('express');
const cors = require('cors');
const fs = require('fs');
var https = require('https');
//Crt
var options = {
    key: fs.readFileSync('./config/private.key'),
    cert: fs.readFileSync('./config/combined.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
//Project's own requires
const config  = require('./config/config').server;
// set a cookie
//Initializations
const app = express();
//const auth = require('./routes/auth')
const rg = require('./routes/resource_guru')
const mail = require('./routes/sendEmail')
const conn_logs = require('./routes/conn_logs')
//Express Settings
app.use(cors());
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = res.cookie;
    if (cookie === undefined)
    {
      res.cookie('foo', 'bar', {
        sameSite: true
      });
    } 
    else
    {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
  });
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