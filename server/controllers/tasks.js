//SYNC 11/03/2017 DP
"use strict";
/*eslint no-console: 0*/
const Task = require('mongoose').model('Task');
const files = require('../controllers/files');
const mailer = require('../config/mailer.js');
const config = require('../config/config.js');
const utils = require('../config/utils');
const databind = require('../helpers/data-bind');

const uploaded = config.uploaded;


exports.getTasks = function(req, res) {
    const status = req.params.status;
    const capa = req.params.capa || 0;

    Task.find({$and: [{TKStat: { $lte: status }}, { TKCapa: { $gte: capa }}]}, { SourceId: true, TKName: true, TKTarg: true, TKStart:true, TKChamp:true, TKStat:true, TKCapa:true})
        .sort({TKTarg:1}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getProjectTaskList = function(req, res) {
    Task.find({SourceId:req.params.id}, function(err, collection) {
        res.send(collection);
    });
};

exports.updateTask = function(req, res) {
    const query = {_id: req.params.id};
    const newOwner = req.body.TKChampNew;
    req.body.TKChampNew = false;

    Task.findOneAndUpdate(query, req.body, function (err) {
        if (err) return handleError(err);
        res.sendStatus(200);

        if(newOwner){
          sendEmail(req.body);
        }
    });
};


exports.deleteTask = function(req, res) {
    const taskId = req.params.id;
    let taskTitle = '';
    let SourceId = '';
    const user = req.user.fullname;

    Task.findOne({_id:taskId}).exec(function(err, task) {
        taskTitle = task.TKName;
        SourceId = task.SourceId;

        Task.remove({_id:taskId}, function (err) {
            if (err) return handleError(err);
            res.status(200).send(taskId);
        });

        utils.write_to_log("DELETED TASK - " + "(" + SourceId + " - " + taskTitle + ") by " + user);
    });



};

exports.createTask = function(req, res, next) {
  const _body = req.body;
    Task.create(_body, function(err, task) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Task');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.status(200).send(task);
        sendEmail(_body);
    });
};

function sendEmail(_body){
  const emailContent = [];
  emailContent._id = _body.SourceId;
  emailContent.name = _body.TKName;
  emailContent.assigned = _body.TKChamp;
  emailContent.emailDate = _body.TKTarg;
  emailContent.emailType = "Deviation Task";
  emailContent.dateHeader = "Target Date";
  mailer.createEmail(emailContent);
}

exports.getTaskById = function(req, res) {
    Task.findById(req.params.id).exec(function(err, task) {
        res.send(task);
    });
};

exports.getTaskCount = function(req,res){
    Task.count({SourceId:req.params.id}, function(err, taskCount){
        res.send(taskCount.toString());
    });
};

exports.getTasksCountByUser = function(user){
  return Task.count({$and: [{TKChamp:user}, {TKStat: {$lt:5}}]});
};

exports.getCountAll = function(){
  return Task.count({TKStat: {$lt:5}});
};

exports.getReportData = function(){
    return Task.find({'TKStat':{$lte:4}}, {SourceId:1, TKName:1, TKTarg:1, TKStart:1, TKChamp:1, TKStat:1})
        .sort({TKTarg : 1}).exec();
};

exports.dumpTasks = function(req, res) {
    const fileData = {};
    const newDate = new Date();
    const int = parseInt((Math.random()*1000000000),10);
    const filename = 'tasks' + int;

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = filename;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'tasks' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    const _search = !req.body.search ? "." : req.body.search;
    const regExSearch = new RegExp(_search + ".*", "i");
    const _status = 4;

    //Create an id for use on the client side
    fileData._id = int;

    databind.createTaskReport(filename, _search, regExSearch, _status);
    res.send(fileData);
};

function handleError(err){
    console.log(err);
}
