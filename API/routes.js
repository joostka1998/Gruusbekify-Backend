module.exports = function(app) {
    var controller = require('./controller');

    // Routes
    app.route('/')
        .get(controller.defaultRoute);

    app.route('/playlist/:id')
        .get(controller.getPlaylist);

    app.route('/schlager/:id')
        .get(controller.getSchlager);

};