const express = require('express');
const auth = require('./config/auth');
const utils = require('./config/utils');
const config = require('./config/config');

const app = express();

require('./config/express')(app, config);
require('./config/mongoose')(config);
require('./config/passport')();
app.use(require('./config/route'));
app.get('/*', function (req, res) {
    res.render('index.html');
});


/* eslint-disable no-console */
app.listen(config.port, function() {
    console.log('Express server 🌎  listening on port ' + config.port);
    console.log('env = ' + config.env +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
