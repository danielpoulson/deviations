const express = require('express');
const env = process.env.NODE_ENV || 'development';
const auth = require('./server/config/auth');

const app = express();
const config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
app.use(require('./server/config/route'));

app.get('*', function (req, res) {
    res.render('index.html');
});

app.listen(config.port, function() {
    console.log('Express server 🌎  listening on port ' + config.port);
    console.log('env = ' + process.env.NODE_ENV +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
