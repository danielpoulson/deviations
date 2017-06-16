"use strict";
const Deviation = require('mongoose').model('Deviation');
const files = require('../controllers/files');
const logger = require('../controllers/loggers');
const tasks = require('../controllers/tasks');
const users = require('../controllers/users');
const mailer = require('../config/mailer.js');
const exportdata = require('../config/data.js');
const utils = require('../config/utils');
const config = require('../config/config');
const reporter = require('../helpers/reports');
const fs = require('fs');


// TODO: (1) @Medium Single call to get all deviation data (files, tasks, logs)
// This is currently four seperate calls


exports.getDeviations = function(req, res) {
    const status = parseInt(req.params.status);
    const customer = req.params.cust;
    let search = '';
    let csvData = [];

    if (customer === "all"){
        search = new RegExp(".");
    } else {
        search = new RegExp(customer);
    }

    Deviation.find({$and: [{dvClosed: {$lt:status}}, {$or:[{dvCust:"MFG"}, {dvCust: search}]}]}, {dvNo:true, dvMatNo:true, dvMatName:true, dvExtract:1, dvCust:true, 'dvCreated':1, dvAssign:true, dvClosed:true, dvClass: 1})
        .sort({dvNo:1})
        .exec(function(err, collection) {
            if(err){
                utils.handleError("get deviations : " + err);
            }
            res.status(200).send(collection);
        });
};

function getAllDeviations(_status, regExSearch) {
    return Deviation.find({dvClosed: {$lte:_status}})
        .select({dvNo: 1, dvMatNo: 1, dvMatName: 1, dvCust: 1, 'dvCreated':1, dvAssign: 1, dvClosed: 1, dvDateClosed: 1, dvClass: 1, dvStatus: 1, dvExtract: 1, _id: 0})
        .where({$or: [{dvAssign : regExSearch }, {dvNo : regExSearch}, {dvMatName : regExSearch}, {dvCust : regExSearch}]})
        .exec();
}

exports.updateDeviation = function(req, res) {
    const _dev = req.body;
    // These two functions below do the following functions
    // 1. push the logged event to the logger function
    logger._createlog(_dev.dvLog);

    // 2. The delete function on the objects removes the dvLog key so the old records are not overwritten.
    delete _dev.dvLog;

    if(!_dev.dvNotChanged){
        sendEmail(_dev);
    }

    delete _dev.dvNotChanged;

    Deviation.update({dvNo:req.params.id}, {$set: _dev}, function (err) {
        if (err) {
            utils.handleError({reason:err.toString()});
        }
        res.sendStatus(200);
    });
};

function sendEmail(_body){
  const emailContent = [];
  emailContent._id = _body.dvNo;
  emailContent.name = _body.dvMatName;
  emailContent.assigned = _body.dvAssign;
  emailContent.emailDate = _body.dvCreated;
  emailContent.emailType = "Deviation";
  emailContent.dateHeader = "Date Created";
  mailer.createEmail(emailContent);
}

exports.deleteDeviation = function(req, res) {
    Deviation.remove({ProjNo:req.params.id}, function (err) {
        if (err) return utils.handleError(err);
        res.sendStatus(200);
    });
};

exports.createDeviation = function(req, res) {
    let newDevNum = '';
    const new_date = new Date();
    const yr = new_date.getFullYear().toString().substr(2, 2);
    const search = new RegExp("DV" + yr);
    const _dev = req.body;

    const devCount = Deviation.count({dvNo: search}).exec(function (err, count) {
        if (err) return utils.handleError(err);

        newDevNum = "DV" + ((yr * 10000) + (count + 1));

        const _logs = _dev.dvLog;
        _logs.SourceId = newDevNum;
        logger._createlog(_logs);
        delete _dev.dvLog;

        _dev.dvNo = newDevNum;

        const deviation = new Deviation(_dev);

        deviation.save(function (err, data) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.status(200).send(data);
        });
    });
};


exports.getDeviationById = function(req, res) {
    Deviation.findOne({dvNo:req.params.id}).exec(function(err, data) {
        res.send(data);
    });
};

exports.getDeviationNameById = function(req, res) {
    Deviation.findOne({ProjNo:req.params.id}, {ProjNo:true, Title:true, _id:false}).exec(function(err, project) {
        res.send(project);
    });
};

//TODO (4) This fuction should be pasted a year and return a count for the given year
exports.deviationCountYear = function(req, res) {

    const search = /DV15/;

    Deviation.count({dvNo: search}).exec(function (err, count) {
        if (err) return utils.handleError(err);
        res.status(200).send({count: count});
    });
};

//TODO (4) This fuction should be pasted a year and return grouped class counts for the given year
exports.getClass = function(req, res) {
    const search = /DV15/;

    Deviation.aggregate({$match : {dvNo:{$in : [/^DV15.*$/]}}},
        {$group : {_id : "$dvClass", total : {$sum :1}}}, {$sort: {total : -1}}).exec(function (err, devClass) {
        if (err) return utils.handleError(err);
        res.status(200).send(devClass);
    });
};


exports.getCustomers = function(req, res) {

    Deviation.distinct("dvCust").exec(function (err, customers) {
            if (err) return utils.handleError(err);
            res.status(200).send(customers);
        });
};

exports.getGraphData = function(req, res){

    const trendData = {};
    trendData.lineData = exportdata.myData();
    trendData.chartData = exportdata.changeData;
    res.send(trendData);
};

exports.getReportData = function(status){
    return Deviation.find({dvClosed: {$lt:status}})
        .select({ dvNo: 1, dvMatName: 1, _id:0 })
        .exec();
};

// This function gets the count for **active** tasks and change controls for the logged in user
exports.getUserDashboard = function(req, res){
  const dashboard = {};
  let username = '';

  const promise = Deviation.count({dvClosed: {$lt:1}}).exec();

  promise.then(data => {
    dashboard.allDeviationCount = data;
    return users.getFullname(req.params.user);
  }).then(data => {
    username = data[0].fullname;
    return Deviation.count({$and: [{dvAssign: username }, {dvClosed: {$lt:1}}]});
  }).then( data => {
    dashboard.deviationCount = data;
    return tasks.getTasksCountByUser(username);
  }).then( data => {
    dashboard.taskCount = data;
    return tasks.getCountAll();
  }).then( data => {
    dashboard.allTaskCount = data;
    res.send(dashboard);
  }).catch(err => console.log(err));
};

exports.dumpDeviations = function(req, res) {
    const fileData = {};
    const newDate = new Date();
    const int = parseInt((Math.random()*1000000000),10);
    const filename = 'deviations' + int;
    const fields = ['_dvNo', '_dvMatNo', '_dvMatName', '_dvCust', '_dvAssign', '_dvCreated', '_dvDateClosed', '_dvClosed', '_dvClass', '_dvStatus', '_dvExtract'];
    const fieldNames = ['DevId', 'Material#', 'Material_Name', 'Customer', 'Assigned', 'Created', 'Closed', 'IsClosed', 'Class', 'Status', 'Extracted'];

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = filename;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'deviations' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    const _search = !req.body.search ? "." : req.body.search;
    const regExSearch = new RegExp(_search + ".*", "i");
    const _status = req.body.showAll ? 1 : 0;

    fileData._id = int;

    const p = getAllDeviations(_status, regExSearch);
    p.then(data => {
      const _devData = data.map(dev => {
        const _dvNo = dev.dvNo;
        const _dvMatNo = dev.dvMatNo;
        const _dvMatName = dev.dvMatName.replace(/,/g, "");
        const _dvCust = (typeof dev.dvCust != 'undefined') ? dev.dvCust.replace(/,/g, "") : '';
        const _dvAssign = dev.dvAssign;
        const _dvCreated = (typeof dev.dvCreated != 'undefined') ? utils.dpFormatDate(dev.dvCreated) : '';
        const _dvDateClosed = (typeof dev.dvDateClosed != 'undefined') ? utils.dpFormatDate(dev.dvDateClosed) : '';
        const _dvClosed = dev.dvClosed;
        const _dvClass = dev.dvClass;
        const _dvStatus = (typeof dev.dvStatus != 'undefined') ? dev.dvStatus.replace(/,/g, "") : '';
        const _dvExtract = (typeof dev.dvExtract != 'undefined') ? dev.dvExtract.replace(/,/g, "") : '';

        return {_dvNo, _dvMatNo, _dvMatName, _dvCust, _dvAssign, _dvCreated, _dvDateClosed, _dvClosed, _dvClass, _dvStatus, _dvExtract};
      });

      reporter.printToCSV(_devData, filename, fields, fieldNames);
    });
    
    //Create an id for use on the client side
    fileData._id = int;
    res.send(fileData);
};
