var express = require('express');
var app = express();
var File = require('mongoose').model('File');
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var fs = require('fs');


exports.downloadFile = function (req, res) {
    var filename = req.params.file;
    var fileType = filename.substring(0,3);
    var file = '';

// TODO LOW EASY: duplicated file = '.././uploads/' + filename;???.    
    if(fileType == 'exp'){
        filename = filename.slice(6);
        file = '.././uploads/' + filename;
    } else {

        file = '.././uploads/' + filename;
    }

    res.download(file, filename, function(err){
      if (err) {
        console.log(err);
      } else {
        if(fileType == 'exp'){

            File.find({fsFilePath : filename})
                .exec(function (err, collection) {
                fileDeletion(collection[0]._id);
            });
        }
      }
    });
};

exports.uploadFile = function (req, res) {
    var fileData = {};
    var docName = req.body.docName;

    //TODO (5) Minor Functionally only works for Deviations.
    const myRe = /DV\d{6}\s[-]\s/;
    var myArray = myRe.exec(docName);

    if(myArray) {
        fileData.fsFileName = docName.split('.').shift().substr(11);
    } else {
        fileData.fsFileName = docName.split('.').shift();
    }

    fileData.fsAddedAt = new Date();
    fileData.fsAddedBy = req.body.dpUser;

    fileData.fsFileExt = docName.split('.').pop();
    fileData.fsDevNo = req.body.dvNo;
    fileData.fsFilePath = req.files[0].filename;
    fileData.fsBooked = 0;

    File.update({fsFileName: fileData.fsFileName}, fileData, {upsert: true}, function (err) {
        if (err) {
            res.sendStatus(200);
            console.log(err.toString());
        }

        File.findOne({fsFileName : fileData.fsFileName}, function(err, file){
            fileData._id = file._id;
            res.status(200).send(fileData);
        });

    });


};

function addExportFile(fileData){

    File.create(fileData, function (err, small) {
      if (err) return console.log(err);
    });

};

exports.getFiles = function (req, res) {

    File.find({fsDevNo: req.params.files})
        .exec(function (err, collection) {
            if (err) throw err;
            res.send(collection);
        });
};

exports.deletefile = function (req, res) {
    var id = req.params.id;

    fileDeletion(id);
    res.sendStatus(204);

};

function fileDeletion(id) {

        File.findById(id, function (err, doc){

          if(doc){
            fs.unlink('.././uploads/' + doc.fsFilePath, function (err) {
                if (err) throw err;
                console.log('successfully deleted /uploads/' + doc.fsFilePath);
            });

            File.remove({_id: id}, function (err) {
                if (err) return handleError(err);
            });
          }
    });
}

exports.getFileCount = function(req,res){
    File.count({fsDevNo:req.params.id}, function(err, fileCount){
        res.send(fileCount.toString());
    });
};

exports.updateFileBook = function(req,res){
    var id = req.params.id;
    console.log("updateFileBook " + req.params.id)
    File.findById(id, function (err, doc){
        doc.fsBooked = 1;
        doc.save();
    });

    res.status(200).send(id);
};

exports.addExportFile = addExportFile;
