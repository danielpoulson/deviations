const express = require('express');
const auth = require('./server/config/auth');

process.env.NODE_ENV = 'production';
process.env.PORT = 3030;

const app = express();
const config = {
  db: 'mongodb://localhost/DeviationDB',
  env: process.env.NODE_ENV
};

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
app.use(require('./server/config/route'));
app.get('/*', function (req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT, function() {
    console.log('Express server 🌎  listening on port ' + process.env.PORT);
    console.log('env = ' + process.env.NODE_ENV +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});