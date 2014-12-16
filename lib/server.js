var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var debug = require('debug')('app');


var routes = require('../routes/index');

var router = express.Router();

for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
        var data = routes[key];
        router[data.method](key, data.fn);
    }
}



var app; // instance of expressjs


var initialise = function () {
    console.log('Starting init');

    // initialise express
    app = express();

    // view engine setup
    app.set('views', path.join(__dirname, '/../views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/../public')));
    /* Index images from public upload folder*/
    app.use('/img/upload', serveIndex('public/img/upload', {'icons': false}));

    app.use('/', router);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

     // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(secret);

    return app;
};

// starting up the server
var start = function (port) {
    app.listen(port, function() {
    debug('Express server listening on port ' + port);
    });
    return app;
};

// server error handler
var secret = function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    };

module.exports = {
    initialise: initialise,
    start: start,
    _secret: secret
};
/*

// ---

Server = function () {};

Server.prototype.start = function () {
    this.app = express();
};


module.exports = Server;

// ---


require('server');
var s = new Server();
s.start();

s.app


*/