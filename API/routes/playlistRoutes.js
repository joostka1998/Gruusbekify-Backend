module.exports = function(app) {
    var controller = require('../controllers/controller');

    // Routes
    app.route('/')
        .get(controller.defaultRoute);

    app.route('/playlist/:id')
        .get(controller.getPlaylist);

};