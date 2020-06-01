module.exports = {
    database:{
		host: '10.48.13.154',
	    port: 3306,
	    user: 'nodeuser',
	    password : 'nodeuser1234',
	    database : 'MAPEO',
		timezone: "+00:00",
		connectionLimit: 10,
		acquireTimeout: 30000
    },
    Resource_Guru:{
        username: 'enma2310@gmail.com',
        password: 'Piz23le10x@',
        grant_type: 'password',
        CLIENT_ID: 'aImfLd5vETvfHjt0dRO_AG43s_LXG2SqxisPapUlzbI',
        CLIENT_SECRET: 'Ho78My6qgOVVRYwoCfTRk-UfA028Q6v6pq7jwcWPO8w',
        RG_URL:"https://api.resourceguruapp.com/v1/enmanuelleon"
    },
    email:{
        EMAIL: 'intelixsender@gmail.com ',
        PASS: 'Int1234567',
        HOST: 'smtp.gmail.com',
        PORT: 465
    },
    server:{
        host: "https://10.48.13.156", //Solo para mostrar en el log
        port: 4080
    }

};
