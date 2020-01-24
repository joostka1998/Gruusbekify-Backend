module.exports = function(app) {
    var controller = require('./controller');

    // Routes
    app.route('/')
        .get(controller.defaultRoute);

    app.route('/playlist')
        .post(controller.createPlaylist);

    app.route('/playlist/:id')
        .get(controller.getPlaylist);

    app.route('/addSchlager')
        .post(controller.addSchlagerToPlaylist);

    app.route('/playlistcontent/:id')
        .get(controller.getPlaylistContent);

    app.route('/schlager/:id')
        .get(controller.getSchlager);

    app.route('/user')
        .get(controller.userTest);

};