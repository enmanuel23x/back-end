//NPM Requires
const express = require('express');
const cors = require('cors');

//Project's own requires



//Initializations
const app = express();
//const auth = require('./routes/auth')
const rg = require('./routes/resource_guru')
const mail = require('./routes/sendEmail')
const bd = require('./routes/mysql_bd')
//Express Settings

app.set('trust proxy', 1);
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});


app.use(cors({
		origin:['http://localhost:3000'],
		methods:['GET','POST'],
	}
));


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
