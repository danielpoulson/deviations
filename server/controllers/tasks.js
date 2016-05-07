var Task = require('mongoose').model('Task');

exports.getTasks = function(req, res) {
    var status = req.params.status;
    var capa = req.params.capa;
    Task.find({TKStat: {$lt : status}, TKCapa: {$gte : capa}},{DevId:true, TKName:true, TKTarg:true, TKComp:true, TKChamp:true, TKStat:true, TKCapa:true})
        .sort({TKTarg:1}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getDeviationTaskList = function(req, res) {
    Task.find({DevId:req.params.id}, function(err, collection) {
        res.send(collection);
    });
};

exports.updateTask = function(req, res) {
    Task.findByIdAndUpdate({_id:req.params.id}, {$set: req.body}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};


exports.deleteTask = function(req, res) {
    Task.remove({_id:req.params.id}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};

exports.createTask = function(req, res, next) {
    Task.create(req.body, function(err, task) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Task');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(200);
    });
};

exports.getTaskById = function(req, res) {
    Task.findOne({_id:req.params.id}).exec(function(err, task) {
        res.send(task);
    });
};

exports.getTaskCount = function(req,res){
    Task.count({DevId:req.params.id}, function(err, taskCount){
        res.send(taskCount.toString());
    });
};
