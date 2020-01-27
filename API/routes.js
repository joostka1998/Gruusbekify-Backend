module.exports = function(app) {
    var controller = require('./controller');

    // Routes
    app.route('/')
        .get(controller.defaultRoute);

    app.route('/createPlaylist')
        .post(controller.createPlaylist);

    app.route('/deletePlaylist')
        .post(controller.deletePlaylist);

    app.route('/playlist/:id')
        .post(controller.getPlaylist);

    app.route('/addSchlager')
        .post(controller.addSchlagerToPlaylist);

    app.route('/removeSchlager')
        .post(controller.removeSchlagerFromPlaylist);

    app.route('/playlistcontent/:id')
        .post(controller.getPlaylistContent);

    app.route('/schlager/:id')
        .get(controller.getSchlager);

};