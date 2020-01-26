var ConnectionFactory = require('./ConnectionFactory.js');
var connection = new ConnectionFactory();

var UserValidator = require('./UserValidator.js');
var validator = new UserValidator();

exports.defaultRoute = function (req, res) {
    try {
        res.status(200).send('Dit is de API van gruusbekify, probeer niks te slopen plz');
    } catch (err) {
        res.status(500).send();
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
        if(!isNaN(parseInt(req.params.id))) {
            result = await connection.executeQuery('SELECT * FROM PlaylistInhoud WHERE PlaylistID = ' + req.params.id);
            res.status(200).send(result);
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
        if(!isNaN(parseInt(req.params.id))) {
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

// exports.userTest = async function (req, res) {
//     try {
//         isUserAuthenticated = await validator.validateUser('1458063457692850', 'EAAH0VA1kwqwBAClZCR0Jz4hTDXfNV7ZA75mwFpXZCupBNQMNnZABGhhG8PnZARE6OrTag9gKZCLTOjZAbpf6PsLtvILXM7Kb6wweDdzURMRzafjKTxRDvuUuRHrKCgkYZByzJ2XW4C1bv1u4vlZCvkAi5hKUeN40AXCifn8zvulCD57DUpjQBkXAoGNJKycxE0tVUbLCcWuZCv3AZDZD');
//         res.status(200).send(isUserAuthenticated);
//     } catch (err) {
//         res.status(500).send();
//         console.log(err);
//     }
// };

