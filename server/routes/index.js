const taskRouter = require('./tasks');
const userRouter = require('./users');
const deviationRouter = require('./deviations');
const fileRouter = require('./files');
const loggerRouter = require('./logger');
const auth = require('../config/auth');

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.post('/login', auth.authenticate);

    app.get('/logout', function (req, res) {
        req.logout();
        res.sendStatus(200);
    });
    
    app.use('/api/deviations', deviationRouter);
    app.use('/api/users', userRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/files', fileRouter);
    app.use('/api/logger', loggerRouter);
}