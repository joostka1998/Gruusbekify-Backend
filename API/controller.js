var ConnectionFactory = require('./ConnectionFactory.js');
var connection = new ConnectionFactory();

exports.defaultRoute = function (req, res) {
    try {
        res.status(200).send('Welkom op de API van gruusbekify');
    } catch (err) {
        console.log(err);
    }
};

exports.getPlaylist = async function (req, res) {
    try {
        if(!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM Playlists WHERE PlaylistID = ' + req.params.id);
            res.status(200).send(result);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getPlaylistContent = async function (req, res) {
    try {
        if(!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM PlaylistInhoud WHERE PlaylistID = ' + req.params.id);
            res.status(200).send(result);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getSchlager = async function (req, res) {
    try {
        if(!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM Schlagers WHERE SchlagerID = ' + req.params.id);
            res.status(200).send(result);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
    }
};

