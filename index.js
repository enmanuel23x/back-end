//NPM Requires
const express = require('express');

//Project's own requires


//Initializations
const app = express();
//const auth = require('./routes/auth')
const rg = require('./routes/resource_guru')
const mail = require('./routes/sendEmail')
const bd = require('./routes/mysql_bd')
//Express Settings

//Express Middlewares
app.use(express.json()); 
//Express Routes

//app.use('/auth', auth)
app.use('/rg', rg)
app.use('/email',mail)
app.use('/bd',bd)
//Start Server
const PORT = process.env.PORT || 4080;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
});
