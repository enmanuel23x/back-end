//npm requires
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
//Project's own requires
//Initializations 
const router = express.Router()
//Rutas
router.post('/login', (req, res) => {
    if(req.body.user === process.env.USER && req.body.pass === process.env.PASS) {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 30//30s
   });
  res.json({ msg: 'Autenticación correcta', token: token });
    } else {
        res.json({ msg: "Usuario o contraseña incorrectos", token: null})
    }
})
module.exports = router
