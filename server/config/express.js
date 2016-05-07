const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

module.exports = function (app, config) {
    app.set('views', config.appViews);
    app.engine('html', require('ejs').renderFile);
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(require('express-session')({
        secret: 'p7r6uktdhmcgvho8o6e5ysrhxmcgjfkot7r6elu5dtjt7lirfyj',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    // Only load this middleware in dev mode (important).
    if (app.get('env') === 'development') {
      const webpack = require('webpack');
      const webpackConfig = require(config.webpackConfig);
      const compiler = webpack(webpackConfig);

      app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
      }));

        app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
      }));

    }

    app.use(express.static(config.staticFiles));

};
