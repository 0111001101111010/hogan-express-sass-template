var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// Set View Engine
// By default, Express will use a generic HTML wrapper (a layout) to render all your pages. If you don't need that, turn it off.
// Set the layout page. Layout page needs {{{ yield }}}  where page content will be injected


app.engine('html', require('hogan-express'));
app.set('view options', {layout: true});
app.set('layout', 'include/layout');
app.set('partials', {
  head: "include/head",
  temp: "include/temp"
});
app.set('views',  __dirname + '/views');
app.set('view engine', 'html');
//app.enable('view cache');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var port = 5555 || process.env.port;
app.listen(port);
console.log("listening on ... " + port);
module.exports = app;
