//npm requires
const express = require('express')
const nodemailer = require('nodemailer');
//project's own requires
const keys = require('../config/keys')
//Initializations
const router = express.Router()

let transport = nodemailer.createTransport({
    service: keys.SERVICE,
    auth: {
       user: keys.EMAIL,
       pass: keys.PASS
    }
})


router.post('/send', (req, res) => {
	const {email, subject, text} = req.body
  	const message = {
	    from: keys.EMAIL, // Sender address
	    to: email,         // List of recipients
	    subject: subject, // Subject line
	    text: text // Plain text body
	};
	transport.sendMail(message, function(err, info) {
	    if (err) {
	      console.log(err)
	    } else {
	      console.log(info);
	    }
	})
	res.send('Mensaje enviado')
})

module.exports = router