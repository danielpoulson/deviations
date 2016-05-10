var Deviation = require('mongoose').model('Deviation');
var Task = require('mongoose').model('Task');
var files = require('../controllers/files');
var fs = require('fs');

exports.getDeviations = function(req, res) {
    var status = parseInt(req.params.status);
    var customer = req.params.cust;
    var search = '';
    var csvData = [];

    if (customer === "all"){
        search = new RegExp(".");
    } else {
        search = new RegExp(customer);
    }

    Deviation.find({$and: [{dvClosed: {$lt:status}}, {$or:[{dvCust:"MFG"}, {dvCust: search}]}]}, {dvNo:true, dvMatNo:true, dvMatName:true, dvCust:true, 'dvLog.dvLogDate': 1, dvAssign:true, dvClosed:true, dvClass: 1})
        .sort({dvNo:1})
        .exec(function(err, collection) {
            if(err){
                console.log("get deviations : " + err);
            }
            res.status(200).send(collection);
        });
};

exports.updateDeviation = function(req, res) {

    Deviation.update({dvNo:req.params.id}, {$set: req.body}, function (err) {
        if (err) {
            console.log({reason:err.toString()});
        }
        res.send(200);
    });
};


exports.deleteDeviation = function(req, res) {
    Deviation.remove({ProjNo:req.params.id}, function (err) {
        if (err) return handleError(err);
        res.sendStatus(200);
    });
};

exports.createDeviation = function(req, res) {

    var newDevNum = '';
    var new_date = new Date();
    var yr = new_date.getFullYear().toString().substr(2, 2);
    var search = new RegExp("DV" + yr);

    var devCount = Deviation.count({dvNo: search}).exec(function (err, count) {
        if (err) return handleError(err);

        newDevNum = "DV" + ((yr * 10000) + (count + 1));

        req.body.dvNo = newDevNum;

        var deviation = new Deviation(req.body);

        deviation.save(function (err) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.status(200).send(deviation);
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

exports.deviationCountYear = function(req, res) {
    //TODO remove static route
    var search = /DV15/;

    Deviation.count({dvNo: search}).exec(function (err, count) {
        if (err) return handleError(err);
        res.status(200).send({count: count});
    });
};

exports.getClass = function(req, res) {
    //TODO remove static route
    var search = /DV15/;

    Deviation.aggregate({$match : {dvNo:{$in : [/^DV15.*$/]}}},
        {$group : {_id : "$dvClass", total : {$sum :1}}}, {$sort: {total : -1}}).exec(function (err, devClass) {
        if (err) return handleError(err);
        res.status(200).send(devClass);
    });
};


exports.getCustomers = function(req, res) {

    Deviation.distinct("dvCust").exec(function (err, customers) {
            if (err) return handleError(err);
            res.status(200).send(customers);
        });
};




exports.getDashboard = function(req, res) {
    //TODO: This block is a bit of a mess not really sure what is the best approach for making all these calls. D.Poulson 05/04/2015
    var dashArray = {
        year1: "2013",
        y1open : 253,
        y1Closed : 250,
        year2: "2014",
        y2open : 325,
        y2Closed : 315,
        year3: "2015",
        y3open : 69,
        y3Closed : 35,
        devClosed1 : 0,
        devClosed2 : 30,
        devClosed3 : 40,
        capa1: 0,
        capa2: 0
    };


    var today = new Date();
    var todayless30 = today.setDate(today.getDate()-30);
    var todayless60 = today.setDate(today.getDate()-60);


    var promise = Task.count({TKCapa : 1, TKStat: {$lt: 5}}).exec();

    promise.then(function (count) {
        dashArray.capa1 = count;
        return Task.count({TKStat: {$lt: 5}}).exec();
    }).then(function (taskCount) {
        dashArray.capa2 = taskCount;
        return Deviation.count({dvClosed:0, dvCreated:{$gt:todayless30}}).exec();
    }).then(function (less30) {
        dashArray.devClosed1 = less30;
        return Deviation.count({dvClosed:0, dvCreated:{$lte:todayless30, $gte: todayless60}}).exec();
    }).then(function(less60){
        dashArray.devClosed2 = less60;
        return Deviation.count({dvClosed:0, dvCreated:{$lte:todayless60}}).exec();
    }).then(function(gt60){
        dashArray.devClosed3 = gt60;
        return Deviation.count({dvNo:{$in : [/^DV15.*$/]}}).exec();
        //TODO: Remove static variables
    }).then(function(totalDev){
        dashArray.y3open = totalDev;
        return Deviation.count({dvClosed:1, dvNo:{$in : [/^DV15.*$/]}}).exec();
    }).then(function(closedDev){
        dashArray.y3Closed = closedDev;
        res.status(200).send(dashArray);
    });

};

exports.dumpDeviation = function(req, res) {

    Deviation.findAndStreamCsv({dvClosed: {$lt:req.params.id}}, {dvNo:true, dvMatNo:true, dvMatName:true, dvCust:true, dvAssign:true, dvClass: 1, 'dvCreated': 1, _id: 0})
        .pipe(fs.createWriteStream('exports/devs.csv'));

    console.log("Files have been created");

    res.sendStatus(200);
};
