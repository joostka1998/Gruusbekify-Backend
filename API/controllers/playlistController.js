var ConnectionFactory = require('../ConnectionFactory.js');
var connection = new ConnectionFactory();

exports.getPlaylist = async function (req, res) {
    try {
        result = await connection.executeQuery('SELECT * FROM Playlists WHERE playlistID = ' + req.params.id);
        res.status(200).send(result + 'TEST');
    } catch (err) {
        console.log(err);
    }
};