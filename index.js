//NPM Requires
const express = require('express');
const cors = require('cors');
//Project's own requires
const config  = require('./config/config').server;
//Initializations
const app = express();
//const auth = require('./routes/auth')
const resource = require('./routes/resources')
const mail = require('./routes/sendEmail')
const conn_logs = require('./routes/conn_logs')
//Express Settings
app.use(cors());
//Express Middlewares
app.use(express.json()); 
//Express Routes
//app.use('/auth', auth)
app.use('/resource', resource)
app.use('/email',mail)
app.use('/bd',conn_logs)
//Start Server
const PORT = process.env.PORT || config.port;

app.listen(PORT, function(){
    console.log(`Server running on ${config.host}:${PORT}`)
});