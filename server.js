// server.js

// The Setup
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js'),
    nunjucks = require('express-nunjucks');

// Configuration

mongoose.connect(configDB.url); // connect to database

require('./config/passport')(passport); // pass passport for configuration
//setup express
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); //get info from html forms
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

nunjucks.setup({
  autoescape: true,
  watch: true
}, app);

// required for passport
app.use(session({secret: 'notsosecretafterall'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./app/routes.js')(app, passport); // load our routes and pass in app and configured passport

// launch
app.listen(port);
console.log('Party on port %s', port);
