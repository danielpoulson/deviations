"use strict"
var Task = require('mongoose').model('Task');
var Change = require('mongoose').model('Change');
var fs = require('fs');
var files = require('../controllers/files');
var Users = require('../controllers/users');
var json2csv = require('json2csv');
var mailer = require('../config/mailer.js');
var moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment');

//TODO: LOW FUNC This all task get function only for change control only should by dynamic
// When add project functionality the get task function would need to be used for both.
exports.getTasks = function(req, res) {
    var status = req.params.status;

    Task
        .where('TKStat').lte(status)
        .where('SourceId').in([/^CC.*$/])
        .select({SourceId:1, TKName:1, TKTarg:1, TKStart:1, TKChamp:1, TKStat:1})
        .sort({TKTarg : 1})
        .exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getProjectTaskList = function(req, res) {
    Task.find({SourceId:req.params.id}, function(err, collection) {
        res.send(collection);
    });
};

exports.updateTask = function(req, res) {
    var query = {_id: req.params.id};
    var newOwner = req.body.TKChampNew;
    req.body.TKChampNew = false;

    Task.findOneAndUpdate(query, req.body, function (err) {
        if (err) return handleError(err);
        res.send(200);

        if(newOwner){
          createEmail(req.body);
        }
    });
};


exports.deleteTask = function(req, res) {
    var taskId = req.params.id;
    var taskTitle = '';
    var SourceId = '';
    var user = req.user.fullname;

    Task.findOne({_id:taskId}).exec(function(err, task) {
        taskTitle = task.TKName;
        SourceId = task.SourceId;

        Task.remove({_id:taskId}, function (err) {
            if (err) return handleError(err);
            res.status(200).send(taskId);
        });

        write_to_log("DELETED TASK - " + "(" + SourceId + " - " + taskTitle + ") by " + user);
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
        res.status(200).send(task);
        createEmail(req.body);
    });
};


function createEmail(body){
    var _targetDate = moment(body.TKTarg).format('DD/MM/YYYY');
    var emailType = "Change Control - Task";
    var emailActivity = '<b>Associated Change Control - </b><em>' + body.SourceId + '</em></br><b>Task to Complete: </b><i>'
     + body.TKName + '<b>  Date Due </b>' + _targetDate + '</i>';
// TODO LOW 2 Not the worlds nicest Promise using a timeout need to rework and improve.
    var p = new Promise(function(resolve, reject) {
        var toEmail = Users.getUserEmail(body.TKChamp);
       setTimeout(() => resolve(toEmail), 2000);
    }).then(function(res){
        var _toEmail = res[0].email;
        mailer.sendMail(_toEmail, emailType, emailActivity);
    }).catch(function (err) {
      console.log(err);
    });

};

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

exports.dumpTasks = function(req, res) {
    var fileData = {};
    var newDate = new Date();
    var int = parseInt((Math.random()*1000000000),10);

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'tasks' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'tasks' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    var _search = !req.body.search ? "." : req.body.search;
    var regExSearch = new RegExp(_search + ".*", "i");
    var _status = 4;

    // Task.find({TKStat: {$lt:_status}})
    //     .select({SourceId:true, TKName:true, TKChamp:true, TKStart:true, TKTarg:true, TKStat:true, _id: 0})
    //     .where({$or: [{TKChamp : regExSearch }, {SourceId : regExSearch}, {TKName : regExSearch}]})
    //     .stream()
    //     .pipe(Task.csvTransformStream())
    //     .pipe(fs.createWriteStream(file));

    getChangesList(int)
    res.sendStatus(200);
};


function getChangesList(int) {
    var status = 4;
    var file = '.././uploaded/tasks' + int + '.csv';
    var fields = ['SourceId', '_name', 'TKName', 'TKTarg', 'TKStart', 'TKChamp', 'TKStat'];

    Change.find({CC_Stat: {$lt:status}})
        .select({ CC_No: 1, CC_Descpt: 1, _id:0 })
        .sort({CC_TDate:1})
        .exec(function(err, collection) {

            Task
                .where('TKStat').lte(4)
                .select({SourceId:1, TKName:1, TKTarg:1, TKStart:1, TKChamp:1, TKStat:1})
                .sort({TKTarg : 1})
                .exec(function(err, coll) {

                    var reformattedArray = coll.map(function(obj){

                        var TKName = obj.TKName;
                        var TKTarg = moment(obj.TKTarg).format("L");
                        var TKStart = moment(obj.TKStart).format("L");
                        var TKChamp = obj.TKChamp;
                        let TKStat = null;
                        var SourceId = obj.SourceId;

                        switch (obj.TKStat) {
                            case 1 :
                                TKStat = "Not Started (New)";
                                break;
                            case 2 :
                                TKStat = 'On Track';
                                break;
                            case 3 :
                                TKStat = 'In Concern';
                                break;
                            case 4 :
                                TKStat = 'Behind Schedule';
                                break;
                            case 5 :
                                TKStat = 'Completed';
                                break;
                            default :
                                TKStat = "Not Set";
                                break;
                        }

                        var _tasks = collection.find(change => change.CC_No === obj.SourceId);

                        if (typeof _tasks === 'object') {
                            var _name = _tasks.CC_Descpt;
                            return {TKName, _name, TKTarg, TKStart, TKChamp, TKStat, SourceId};
                        };


                    });

                    json2csv({ data: reformattedArray, fields: fields }, function(err, csv) {
                      if (err) console.log(err);
                      fs.writeFile(file, csv, function(err) {
                        if (err) throw err;
                        console.log('file saved');
                      });
                    });

            });
    })
};

function write_to_log (write_data) {
    var fs = require("fs");
    var path = '.././logs/logs.txt';
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2)
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var dString = day + "/" + month + "/" + year;

    var write_data = "\r\n" + dString + " - " + write_data;

    fs.appendFile(path, write_data, function(error) {
         if (error) {
           console.error("write error:  " + error.message);
         } else {
           console.log("Successful Write to " + path);
         }
    });
}

function handleError(err){
    console.log(err);
};
