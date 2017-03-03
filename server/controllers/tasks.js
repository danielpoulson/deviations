"use strict";
const Task = require('mongoose').model('Task');
const Deviation = require('mongoose').model('Deviation');
const fs = require('fs');
const files = require('../controllers/files');
const json2csv = require('json2csv');
const users = require('../controllers/users');
const mailer = require('../config/mailer.js');
const utils = require('../config/utils');
const moment = require('moment');

exports.getTasks = function(req, res) {
    const status = req.params.status;
    const capa = req.params.capa;
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
        if (err) return utils.utils.handleError(err);
        res.send(200);
        if(newOwner){
        //   createEmail(req.body);
        }
    });
};


exports.deleteTask = function(req, res) {
    Task.remove({_id:req.params.id}, function (err) {
        if (err) return utils.handleError(err);
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
        // createEmail(req.body);
    });
};

function createEmail(body){
    const _targetDate = utils.dpFormatDate(body.TKTarg);
    const emailType = "Deviation - Task";
    const emailActivity = `<b>Associated Deviation - </b><em>${body.DevId}</em> </br>
        <b>Task to Complete:</b><i>${body.TKName} <b>Date Due</b> ${_targetDate}</i>`;
//TODO: (4) Not the worlds nicest Promise using a timeout need to rework and improve.
    const p = new Promise(function(resolve, reject) {
        const toEmail = users.getUserEmail(body.TKChamp);
       setTimeout(() => resolve(toEmail), 2000);
    }).then(function(res){
        const _toEmail = res[0].email;
        mailer.sendMail(_toEmail, emailType, emailActivity);
    }).catch(function (err) {
      utils.handleError(err);
    });

}

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
    let fileData = {};
    const newDate = new Date();
    const int = parseInt((Math.random()*1000000000),10);

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'tasks' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsDevNo = req.body.fsSource;
    fileData.fsFilePath = 'tasks' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    const _search = !req.body.search ? "." : req.body.search;
    const regExSearch = new RegExp(_search + ".*", "i");
    const _status = 4;

    getDeviationList(fileData.fsFilePath, regExSearch);
    res.sendStatus(200);
};

function getDeviationList(filepath, regExSearch) {
    const status = 4;
    const file = utils.uploads + filepath;
    const fields = ['DevId', '_name', 'TKName', 'TKTarg', 'TKChamp', 'TKStat'];

    Deviation.find({})
        .select({ dvNo: 1, dvMatName: 1, _id:0 })
        .exec(function(err, collection) {

            Task
                .where('TKStat').lte(4)
                .where({$or: [{TKChamp : regExSearch }, {TKName: regExSearch}, {DevId: regExSearch}]})
                .select({DevId:1, TKName:1, TKTarg:1, TKChamp:1, TKStat:1})
                .exec(function(err, coll) {

                    const reformattedArray = coll.map(function(obj){

                        const TKName = obj.TKName;
                        const TKTarg = moment(obj.TKTarg).format("DD/MM/YY");
                        const TKChamp = obj.TKChamp;
                        let TKStat = null;
                        const DevId = obj.DevId;

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

                        const _tasks = collection.find(deviation => deviation.dvNo === obj.DevId);

                        if (typeof _tasks === 'object') {
                            const _name = _tasks.dvMatName;
                            return {TKName, _name, TKTarg, TKChamp, TKStat, DevId};
                        }


                    });

                    json2csv({ data: reformattedArray, fields: fields }, function(err, csv) {
                      if (err) utils.handleError(err);
                      fs.writeFile(file, csv, function(err) {
                        if (err) throw err;
                        utils.handleError('file saved');
                      });
                    });

            });
    });
}

function write_to_log (write_data) {
    const fs = require("fs");
    const path = '.././logs/logs.txt';
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const dString = day + "/" + month + "/" + year;

    write_data = "\r\n" + dString + " - " + write_data;

    fs.appendFile(path, write_data, function(error) {
         if (error) {
           utils.handleError("write error:  " + error.message);
         } else {
           utils.handleLog("Successful Write to " + path);
         }
    });
}
