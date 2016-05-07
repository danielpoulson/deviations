var Change = require('mongoose').model('Change');
var fs = require('fs');
var files = require('../controllers/files');
const tasks = require('../controllers/tasks');
const users = require('../controllers/users');

exports.getChanges = function(req, res) {
    var status = req.params.status;
    Change.find({CC_Stat: {$lt:status}})
        .select({ CC_No: 1, CC_Descpt: 1, CC_Champ: 1, CC_TDate: 1, CC_Stat: 1, CC_Prop: 1 })
        .sort({CC_No:1})
        .exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createChange = function(req, res, next) {
    var newNum = '';
    var new_date = new Date();
    var yr = new_date.getFullYear().toString().substr(2, 2);
    var search = new RegExp("CC" + yr);

    var cnt = Change.count({CC_No: search}).exec(function (err, count) {
        if (err) return err.toString();

        newNum = "CC" + ((yr * 10000) + (count + 1));
        req.body.CC_No = newNum;

        //var project = new Project(req.body);

        Change.create(req.body, function(err, _changes) {
            if(err) {
                if(err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate Username');
                }
                res.status(400);
                return res.send({reason:err.toString()});
            }
            res.status(200).send(_changes);
        });
    });
};

exports.updateChange = function(req, res) {
    Change.update({_id : req.body._id}, {$set: req.body}, function (err) {
        if (err) return handleError(err);
        res.sendStatus(200);
    });
};

exports.updateChangeComment = function(req, res) {
    var _log = req.body;

    var _query =  {$and : [{CC_No: req.params.id }, {CC_LOG : { $elemMatch: { CC_Id : "4", CC_Action : req.body.CC_Action}}}]};
    var _update = {'CC_LOG.$.CC_Id' : "4", 'CC_LOG.$.CC_ActDept': req.body.CC_ActDept , 'CC_LOG.$.CC_ActBy': req.body.CC_ActBy,
        'CC_LOG.$.CC_ActDate': req.body.CC_ActDate, 'CC_LOG.$.CC_Action' : req.body.CC_Action};
    var _updateP = {'CC_Id' : "4", 'CC_ActDept': req.body.CC_ActDept , 'CC_ActBy': req.body.CC_ActBy,
                'CC_ActDate': req.body.CC_ActDate, 'CC_Action' : req.body.CC_Action};

    Change.update(_query, {$set: _update }, function (err, data) {
      if (err) return handleError(err);

      req.body._id = Math.floor(Math.random() * (9999999 - 1)) + 1;

      if(!data.nModified) {
            Change.update({CC_No : req.params.id}, {$push: {CC_LOG : _updateP}}, function (err) {
                if (err) return handleError(err);
                res.send(_log);
                console.log("here");
            });
      } else {
        res.send(_log);
      }

    });
};

exports.getChangeById = function(req, res) {
    Change.findOne({CC_No:req.params.id}).exec(function(err, change) {
        res.send(change);
    })
};

// This function gets the count for **active** tasks and change controls for the logged in user
exports.getUserDashboard = function(req, res){
  const dashboard = {};
  var username = '';
  const promise = Change.count({CC_Stat: {$lt:4}}).exec();

  promise.then(data => {
    dashboard.allChangeCount = data;
    return users.getFullname(req.params.user);
  }).then(data => {
    username = data[0].fullname;
    return Change.count({$and: [{CC_Champ: username }, {CC_Stat: {$lt:4}}]})
  }).then( data => {
    dashboard.changeCount = data;
    return tasks.getTasksCountByUser(username);
  }).then( data => {
    dashboard.taskCount = data;
    return tasks.getCountAll();
  }).then( data => {
    dashboard.allTaskCount = data;
    res.send(dashboard);
  });
}

exports.dumpChanges = function(req, res) {
    //var status = 2;
    var int = parseInt((Math.random()*1000000000),10);
    var file = '.././uploaded/changes' + int + '.csv';
    var fileData = {};
    var newDate = new Date();



    fileData.fsAddedAt = newDate;
    fileData.fsAddedBy = req.body.fsAddedBy;
    fileData.fsFileName = 'changes' + int;
    fileData.fsFileExt = 'csv';
    fileData.fsSource = req.body.fsSource;
    fileData.fsFilePath = 'changes' + int + '.csv';
    fileData.fsBooked = 0;

    files.addExportFile(fileData);

    const _search = !req.body.search ? "." : req.body.search;
    const regExSearch = new RegExp(_search + ".*", "i");
    const _status = req.body.showAll ? 5 : 4;


    Change.find({CC_Stat: {$lt:_status}})
        .select({CC_No:true, CC_Descpt:true, CC_Champ:true, CC_TDate:true, CC_CDate:true, CC_Comp:true, CC_Stat:true, _id: 0})
        .where({$or: [{CC_Champ : regExSearch }, {CC_No : regExSearch}, {CC_Descpt : regExSearch}]})
        // .where({CC_Champ : regExSearch })
        .stream()
        .pipe(Change.csvTransformStream())
        .pipe(fs.createWriteStream(file));

    console.log("Files have been created");

    res.sendStatus(200);

};

function handleError(err){
    console.log(err);
};
