module.exports = function(app) {
    var playlistController = require('../controllers/playlistController');

    // Routes
    app.route('/playlist/:id')
        .get(playlistController.getPlaylist);

};