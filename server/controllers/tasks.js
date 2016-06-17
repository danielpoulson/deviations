var Task = require('mongoose').model('Task');
var Deviation = require('mongoose').model('Deviation');
var fs = require('fs');
var files = require('../controllers/files');
var json2csv = require('json2csv');
var users = require('../controllers/users');
var mailer = require('../config/mailer.js');
var dateFunc = require('../config/date-function');
var moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment');

exports.getTasks = function(req, res) {
    var status = req.params.status;
    var capa = req.params.capa;
    Task.find({$and: [{TKStat: { $lte: status }}, { TKCapa: { $gte: capa }}]}, { DevId: true, TKName: true, TKTarg: true, TKComp:true, TKChamp:true, TKStat:true, TKCapa:true})
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
    const newOwner = req.body.TKChampNew;
    req.body.TKChampNew = false;
    Task.findByIdAndUpdate({_id:req.params.id}, {$set: req.body}, function (err) {
        if (err) return handleError(err);
        res.send(200);
        if(newOwner){
          createEmail(req.body);
        }
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
        res.status(200).send(task);
        createEmail(req.body);
    });
};

function createEmail(body){
    var _targetDate = dateFunc.dpFormatDate(body.TKTarg);
    var emailType = "Deviation - Task";
    var emailActivity = `<b>Associated Deviation - </b><em>${body.DevId}</em> </br>
        <b>Task to Complete:</b><i>${body.TKName} <b>Date Due</b> ${_targetDate}</i>`;
// TODO: Not the worlds nicest Promise using a timeout need to rework and improve.
    var p = new Promise(function(resolve, reject) {
        var toEmail = users.getUserEmail(body.TKChamp);
       setTimeout(() => resolve(toEmail), 2000);
    }).then(function(res){
        var _toEmail = res[0].email;
        mailer.sendMail(_toEmail, emailType, emailActivity);
    }).catch(function (err) {
      console.log(err);
    });

};

exports.getTaskById = function(req, res) {
    Task.findOne({_id:req.params.id}).exec(function(err, task) {
        res.send(task);
    });
};

exports.getTasksCountByUser = function(user){
  return Task.count({$and: [{TKChamp:user}, {TKStat: {$lt:5}}]});
};

exports.getCountAll = function(){
  return Task.count({$and: [{TKStat: { $lte: 4 }}, { TKCapa: { $gte: 0 }}]});
};

exports.getTaskCount = function(req,res){
    Task.count({DevId:req.params.id}, function(err, taskCount){
        res.send(taskCount.toString());
    });
};

exports.dumpTasks = function(req, res) {
    var fileData = {};
    var newDate = new Date();
    var int = parseInt((Math.random()*1000000000),10);

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'tasks' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsDevNo = req.body.fsSource;
    fileData.fsFilePath = 'tasks' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    // TODO DP: The task export function takes in a search command but does not filter by the search text.           
    var _search = !req.body.search ? "." : req.body.search;
    var regExSearch = new RegExp(_search + ".*", "i");
    var _status = 4;

    getDeviationList(int)
    res.sendStatus(200);
};


function getDeviationList(int) {
    var status = 4;
    var file = '.././uploads/tasks' + int + '.csv';
    var fields = ['DevId', '_name', 'TKName', 'TKTarg', 'TKChamp', 'TKStat'];

    Deviation.find({})
        .select({ dvNo: 1, dvMatName: 1, _id:0 })
        .exec(function(err, collection) {

            Task
                .where('TKStat').lte(4)
                .select({DevId:1, TKName:1, TKTarg:1, TKChamp:1, TKStat:1})
                .exec(function(err, coll) {

                    var reformattedArray = coll.map(function(obj){

                        var TKName = obj.TKName;
                        var TKTarg = moment(obj.TKTarg).format("DD/MM/YY");
                        var TKChamp = obj.TKChamp;
                        var TKStat = null;
                        var DevId = obj.DevId;

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

                        var _tasks = collection.find(deviation => deviation.dvNo === obj.DevId);

                        if (typeof _tasks === 'object') {
                            var _name = _tasks.dvMatName;
                            return {TKName, _name, TKTarg, TKChamp, TKStat, DevId};
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
