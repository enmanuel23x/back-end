//npm requires
const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
//Project's own requires
const pool = require('../database');
//Initializations 
const router = express.Router()
//Rutas
router.post('/data', (req, res) => {
    /*Ruta post /data
    Requiere email en el req.body
    Devuelve por res.json la respectiva fila en la base de datos, si no existe devuelve "[]"
    */
    const { email } = req.body
    pool.query('SELECT * FROM connection_logs WHERE email = "'+email+'"', (err, conn) => {
        printError(err)
        res.json(conn)
    });
})

router.post('/update', (req, res) => {
    /*Ruta post /update
    Requiere email en el req.body y tambien requiere del booleano create(true indica para crear una nueva fila en la tabla)
    Devuelve por res.send (0:Sin errores) (1:Error al obtener datetime en la ruta especificada)
    */
    const date = new Date().toLocaleString('es-ES', {timeZone: 'UTC' }).replace(/\//g,'-')
    const formated_date = date.split(" ")[0].split("-")[2]+"-"+date.split(" ")[0].split("-")[1]+"-"+date.split(" ")[0].split("-")[0]+" "+date.split(" ")[1]
    const { email,create } = req.body
    const query = create ?  "INSERT INTO connection_logs (`email`, `first_conn`, `last_conn`) VALUES ('"+email+"','"+formated_date+"','"+formated_date+"') ":'UPDATE connection_logs SET last_conn = "'+formated_date+'" WHERE email = "'+email+'"';
    pool.query(query, (err, conn) => {
        printError(err)
        res.send(formated_date)
    });
})
//Funcion para imprimir errores
function printError(e){
	if(e!=null){
		console.log(e)
	}
}
module.exports = router
