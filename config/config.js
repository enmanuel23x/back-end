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
        username: 'ale.aesb@gmail.com',
        password: 'Marzo2020.',
        grant_type: 'password',
        CLIENT_ID: 'JRnuq5nOP0RobRyhKMdpbvTonFCKccOU57ExKA7PUqQ',
        CLIENT_SECRET: 'XmVU5uEM4QkaQKgnmtct4aOyXgFovHtmgGAwQFxhCpo',
        RG_URL:"https://api.resourceguruapp.com/v1/intelix1"
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
