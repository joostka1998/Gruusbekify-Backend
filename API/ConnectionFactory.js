const mysql = require('mysql');

var db = require('db_config');

var db_config = {
    host: db.HOST,
    port: db.PORT,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DATABASE
};

var connection;
var numberOfRestarts = 0;

module.exports = class ConnectionFactory {

    constructor() {
        this.connectAndHandleDisconnect();
        // this.openConnection();
        // setInterval(function () {
        //     connection.query('SELECT 1');
        // }, 5000);
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
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                numberOfRestarts ++;
                console.log('Disconnect happened for the: ' + numberOfRestarts + ' time...');
                self.connectAndHandleDisconnect();
            } else {
                throw err;
            }
        });
    }

    // connect to mysql
    openConnection() {
        connection.connect(function(err) {
            // in case of error
            if(err) {
                console.log('Error opening connection: ' + err);
            }
            console.log('Connection opened');
        });
    };

    // Close the connection
    closeConnection() {
        connection.end(function(err){
            if(err) {
                console.log('Error closing connection: ' + err);
                //connection.destroy();
            }
            console.log('Connection closed');
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

