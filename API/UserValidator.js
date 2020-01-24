var ConnectionFactory = require('./ConnectionFactory.js');
var connection = new ConnectionFactory();

const fetch = require('node-fetch');

module.exports = class UserValidator {

    async validateUser(userID, accessToken) {
        const res = await fetch('https://graph.facebook.com/me?access_token=' + accessToken);
        const json = await res.json();

        if(json.id === userID ) {
            try {
                connection.executeQuery(`INSERT INTO Users VALUES (\'${json.id}\', \'${json.name}\') ON DUPLICATE KEY UPDATE UserName = \'${json.name}\'`);
            } catch (err) {
                console.log('Error inserting validated user: ' + err);
            }
            return true;
        } else {
            return false;
        }
    }
}