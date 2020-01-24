const mysql = require('mysql');

// var db = require('./db_config.js');

var db_config = {
    // host: db.HOST,
    // port: db.PORT,
    // user: db.USER,
    // password: db.PASSWORD,
    // database: db.DATABASE

    host: process.env.HOST,
    port: process.env.PORTO, // PORT is already taken by heroku standard environment variables.
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

    };

var connection;

module.exports = class ConnectionFactory {

    constructor() {
        this.connectAndHandleDisconnect();
    }

    connectAndHandleDisconnect() {
        const self = this;

        connection = mysql.createConnection(db_config);

        connection.connect(function(err) {
            if(err) {
                console.log('error when connecting to db:', err);
                setTimeout(self.connectAndHandleDisconnect, 2000);
            }
        });

        connection.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                self.connectAndHandleDisconnect();
            } else {
                throw err;
            }
        });
    }

    async executeQuery(query) {
        return new Promise( (resolve, reject) => {
            connection.query(query, function (err, result) {
                if (err) {
                    reject('Error executing query: ' + err);
                }
                resolve(result);
            });
        });
    }

}

