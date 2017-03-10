"use strict";
const Deviation = require('mongoose').model('Deviation');
const Task = require('mongoose').model('Task');
const files = require('../controllers/files');
const logger = require('../controllers/loggers');
const tasks = require('../controllers/tasks');
const users = require('../controllers/users');
const mailer = require('../config/mailer.js');
const exportdata = require('../config/data.js');
const utils = require('../config/utils');
const config = require('../config/config');
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

exports.updateDeviation = function(req, res) {
    const _dev = req.body;
    // These two functions below do the following functions
    // 1. push the logged event to the logger function
    logger._createlog(_dev.dvLog);

    // 2. The delete function on the objects removes the dvLog key so the old records are not overwritten.
    delete _dev.dvLog;

    if(!_dev.dvNotChanged){
        // createEmail(_dev);
    }

    delete _dev.dvNotChanged;

    Deviation.update({dvNo:req.params.id}, {$set: _dev}, function (err) {
        if (err) {
            utils.handleError({reason:err.toString()});
        }
        res.sendStatus(200);
    });
};

function createEmail(body){
    const _DateCreated = utils.dpFormatDate(body.dvCreated);
    const emailType = "Deviation";
    const emailActivity = `<b>Deviation - </b><em>${body.dvNo}</em> </br>
        <b> Deviation Description:</b><i>${body.dvMatName} <b> Date Created</b> ${_DateCreated}</i>`;
//TODO: (4) Not the worlds nicest Promise using a timeout need to rework and improve.
    const p = new Promise(function(resolve, reject) {
        const toEmail = users.getUserEmail(body.dvAssign);
       setTimeout(() => resolve(toEmail), 2000);
    }).then(function(res){
        const _toEmail = res[0].email;
        mailer.sendMail(_toEmail, emailType, emailActivity);
    }).catch(function (err) {
      utils.handleError(err);
    });

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
  });
};

exports.dumpDeviation = function(req, res) {

    Deviation.findAndStreamCsv({dvClosed: {$lt:req.params.id}}, {dvNo:true, dvMatNo:true, dvMatName:true, dvCust:true, dvAssign:true, dvClass: 1, dvDateClosed:1, 'dvCreated': 1, _id: 0})
        .pipe(fs.createWriteStream('exports/devs.csv'));

    utils.handleLog("Files have been created");

    res.sendStatus(200);
};

exports.dumpDeviations = function(req, res) {
    //const status = 2;
    const int = parseInt((Math.random()*1000000000),10);
    const uploadedfolder = config.uploaded;
    const file = uploadedfolder + 'deviations' + int + '.csv';
    let fileData = {};
    const newDate = new Date();

    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'deviations' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'deviations' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    const _search = !req.body.search ? "." : req.body.search;
    const regExSearch = new RegExp(_search + ".*", "i");
    const _status = req.body.showAll ? 1 : 0;


    Deviation.find({dvClosed: {$lte:_status}})
        .select({dvNo: 1, dvMatNo: 1, dvMatName: 1, dvCust: 1, 'dvCreated':1, dvAssign: 1, dvClosed: 1, dvDateClosed: 1, dvClass: 1, dvStatus: 1, dvExtract: 1, _id: 0})
        .where({$or: [{dvAssign : regExSearch }, {dvNo : regExSearch}, {dvMatName : regExSearch}, {dvCust : regExSearch}]})
        .stream()
        .pipe(Deviation.csvTransformStream())
        .pipe(fs.createWriteStream(file));


    utils.handleLog("Files have been created");

    res.sendStatus(200);

};

// This was the old dashboard
// exports.getDashboard = function(req, res) {
//     const dashArray = {
//         year1: "2014",
//         y1open : 325,
//         y1Closed : 325,
//         year2: "2015",
//         y2open : 325,
//         y2Closed : 315,
//         year3: "2016",
//         y3open : 69,
//         y3Closed : 35,
//         devClosed1 : 0,
//         devClosed2 : 30,
//         devClosed3 : 40,
//         capa1: 0,
//         capa2: 0
//     };
//
//
//     const today = new Date();
//     const todayless30 = today.setDate(today.getDate()-30);
//     const todayless60 = today.setDate(today.getDate()-60);
//
//
//     const promise = Task.count({TKCapa : 1, TKStat: {$lt: 5}}).exec();
//
//     promise.then(function (count) {
//         dashArray.capa1 = count;
//         return Task.count({TKStat: {$lt: 5}}).exec();
//     }).then(function (taskCount) {
//         dashArray.capa2 = taskCount;
//         return Deviation.count({dvClosed:0, dvCreated:{$gt:todayless30}}).exec();
//     }).then(function (less30) {
//         dashArray.devClosed1 = less30;
//         return Deviation.count({dvClosed:0, dvCreated:{$lte:todayless30, $gte: todayless60}}).exec();
//     }).then(function(less60){
//         dashArray.devClosed2 = less60;
//         return Deviation.count({dvClosed:0, dvCreated:{$lte:todayless60}}).exec();
//     }).then(function(gt60){
//         dashArray.devClosed3 = gt60;reformattedArray
//         return Deviation.count({dvNo:{$in : [/^DV15.*$/]}}).exec();
//     }).then(function(totalDev){
//         dashArray.y2open = totalDev;
//         return Deviation.count({dvClosed:1, dvNo:{$in : [/^DV15.*$/]}}).exec();
//     }).then(function(closedDev){
//         dashArray.y2Closed = closedDev;
//         return Deviation.count({dvNo:{$in : [/^DV16.*$/]}}).exec();
//     }).then(function(totalDev){
//         dashArray.y3open = totalDev;
//         return Deviation.count({dvClosed:1, dvNo:{$in : [/^DV16.*$/]}}).exec();
//     }).then(function(closedDev){
//         dashArray.y3Closed = closedDev;
//         res.status(200).send(dashArray);
//     });
//
// };
