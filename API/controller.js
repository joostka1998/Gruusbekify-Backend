var ConnectionFactory = require('./ConnectionFactory.js');
var connection = new ConnectionFactory();

var UserValidator = require('./UserValidator.js');
var validator = new UserValidator();

var path = require('path');

exports.defaultRoute = function (req, res) {
    try {
        res.status(200).sendFile(path.join(__dirname + '/Index.html'));
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.getPlaylist = async function (req, res) {
    try {
        if (!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM Playlists WHERE PlaylistID = ' + req.params.id);
            res.status(200).send(result);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.createPlaylist = async function (req, res) {
    try {
        isUserAuthenticated = await validator.validateUser(req.body.userID.toString(), req.body.accessToken.toString());
        if (isUserAuthenticated) {
            await connection.executeQuery(`INSERT INTO Playlists (UserID, PlaylistNaam) VALUES (\'${req.body.userID.toString()}\', \'${req.body.name.toString()}\')`);
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.deletePlaylist = async function (req, res) {
    try {
        isUserAuthenticated = await validator.validateUser(req.body.userID.toString(), req.body.accessToken.toString());
        if (isUserAuthenticated) {
            isUserAllowed = await connection.executeQuery(`SELECT 1 FROM Playlists WHERE PlaylistID = \'${req.body.playlistID.toString()}\' AND UserID = \'${req.body.userID.toString()}\'`);
            if (isUserAllowed[0]['1'] == 1) {
                await connection.executeQuery(`DELETE FROM PlaylistInhoud WHERE PlaylistID = \'${req.body.playlistID}\'`);
                await connection.executeQuery(`DELETE FROM Playlists WHERE PlaylistID = \'${req.body.playlistID}\'`)
            } else {
                res.status(403).send();
            }
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.getPlaylistContent = async function (req, res) {
    try {
        if (!isNaN(parseInt(req.params.id))) {
            isUserAuthenticated = await validator.validateUser(req.body.userID.toString(), req.body.accessToken.toString());
            if (isUserAuthenticated) {
                isUserAllowed = await connection.executeQuery(`SELECT 1 FROM Playlists WHERE (PlaylistID = \'${req.params.id.toString()}\' AND UserID = \'${req.body.userID.toString()}\') OR (Public = 1)`);
                console.log(isUserAllowed);
                if (isUserAllowed[0]['1'] == 1) {
                    result = await connection.executeQuery('SELECT S.SchlagerTitel, S.SchlagerArtiest, S.SchlagerAudioLocatie, S.SchlagerCoverLocatie, S.SchlagerAlbum FROM PlaylistInhoud PI JOIN Schlagers S ON PI.SchlagerID = S.SchlagerID WHERE PI.PlaylistID = ' + req.params.id);
                    res.status(200).send(result);
                } else {
                    res.status(403).send();
                }
            } else {
                res.status(401).send();
            }
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.getSchlager = async function (req, res) {
    try {
        if (!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM Schlagers WHERE SchlagerID = ' + req.params.id);
            res.status(200).send(result);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.addSchlagerToPlaylist = async function (req, res) {
    try {
        isUserAuthenticated = await validator.validateUser(req.body.userID.toString(), req.body.accessToken.toString());
        if (isUserAuthenticated) {
            isUserAllowed = await connection.executeQuery(`SELECT 1 FROM Playlists WHERE PlaylistID = \'${req.body.playlistID.toString()}\' AND UserID = \'${req.body.userID.toString()}\'`);
            if (isUserAllowed[0]['1'] == 1) {
                connection.executeQuery(`INSERT INTO PlaylistInhoud VALUES (${req.body.playlistID}, ${req.body.schlagerID}, ${req.body.positieInLijst})`);
            } else {
                res.status(403).send();
            }
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};

exports.removeSchlagerFromPlaylist = async function (req, res) {
    try {
        isUserAuthenticated = await validator.validateUser(req.body.userID.toString(), req.body.accessToken.toString());
        if (isUserAuthenticated) {
            isUserAllowed = await connection.executeQuery(`SELECT 1 FROM Playlists WHERE PlaylistID = \'${req.body.playlistID.toString()}\' AND UserID = \'${req.body.userID.toString()}\'`);
            if (isUserAllowed[0]['1'] == 1) {
                connection.executeQuery(`DELETE FROM PlaylistInhoud WHERE PlaylistID = \'${req.body.playlistID}\' AND SchlagerID = \'${req.body.schlagerID}\'`);
            } else {
                res.status(403).send();
            }
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
};