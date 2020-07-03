module.exports = {
    database:{
		host: 'localhost',//10.48.13.154
	    port: 3306,
	    user: 'root',//nodeuser
	    password : '',//nodeuser1234
	    database : 'MAPEO',
		timezone: "+00:00",
		connectionLimit: 10,
		acquireTimeout: 30000
    },
    email:{
        EMAIL: 'intelixsender@gmail.com',
        PASS: 'Int1234567',
        HOST: 'smtp.gmail.com',
        PORT: 465
    },
    server:{
        host: "https://10.48.13.156", //Solo para mostrar en el log
        port: 4080
    }

};
