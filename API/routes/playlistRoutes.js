module.exports = function(app) {
    var playlistController = require('../controllers/playlistController');

    // Routes
    app.route('/')
        .get(res.status(200).send('Welkom op de API van gruusbekify'));

    app.route('/playlist/:id')
        .get(playlistController.getPlaylist);

};