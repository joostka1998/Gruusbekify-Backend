var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

var routes = require('./routes.js'); //importing route
routes(app); //register the routes

app.listen(port);

console.log('server started on port: ' + port);