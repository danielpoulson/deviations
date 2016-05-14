const Logger = require('mongoose').model('Logger');

exports.createLog = function(req, res, next) {
    // TODO: This fucntion returns a status of 200 even if the write to log fails
    const _logs = req.body;
    _createlog(_logs);
    res.status(200);
};

function _createlog(_logs) {
    Logger.create(_logs, function(err, log) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Task');
            }
            console.log(err);
        }
    });
}

exports.getLog = function(req, res){
	Logger
		.find({SourceId: req.params.id})
        .sort({LogDate: 1})
        .exec(function(err, collection) {

          res.status(200).send(collection);
    });
}

exports._createlog = _createlog;