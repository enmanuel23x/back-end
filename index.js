//NPM Requires
const express = require('express');
const cors = require('cors');

//Project's own requires
const server  = require('./config/config').server;

//Initializations
const app = express();
//const auth = require('./routes/auth')
const rg = require('./routes/resource_guru')
const mail = require('./routes/sendEmail')
const conn_logs = require('./routes/conn_logs')
//Express Settings
app.use(cors());

//Express Middlewares
app.use(express.json()); 
//Express Routes

//app.use('/auth', auth)
app.use('/rg', rg)
app.use('/email',mail)
app.use('/bd',conn_logs)
//Start Server
const PORT = process.env.PORT || server.port;
app.listen(PORT, () => {
	console.log(`Server running on ${server.host}:${PORT}`)
});
