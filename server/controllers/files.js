"use strict";
const express = require('express');
const app = express();
const File = require('mongoose').model('File');
const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');
// const uploads = path.normalize(rootPath + '../uploads/');
const fs = require('fs');
const utils = require('../config/utils');

// TODO: (1) Medium Need to set the file location one directory higher in production


exports.downloadFile = function (req, res) {
    let filename = req.params.file;
    const fileType = filename.substring(0,3);
    let file = '';

// TODO LOW EASY: duplicated file = '.././uploads/' + filename;???.
    if(fileType == 'exp'){
        filename = filename.slice(6);
        file = utils.uploads + filename;
    } else {

        file = utils.uploads + filename;
    }

    res.download(file, filename, function(err){
      if (err) {
        handleError(err);
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
    let fileData = {};
    const docName = req.body.docName;

    //TODO (5) Minor Functionally only works for Deviations.
    const myRe = /DV\d{6}\s[-]\s/;
    const myArray = myRe.exec(docName);

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
            handleError(err.toString());
        }

        File.findOne({fsFileName : fileData.fsFileName}, function(err, file){
            fileData._id = file._id;
            res.status(200).send(fileData);
        });

    });


};

function addExportFile(fileData){

    File.create(fileData, function (err, small) {
      if (err) return handleError(err);
    });

}

exports.getFiles = function (req, res) {

    File.find({fsDevNo: req.params.files})
        .exec(function (err, collection) {
            if (err) throw err;
            res.send(collection);
        });
};

exports.deletefile = function (req, res) {
    const id = req.params.id;

    fileDeletion(id);
    res.sendStatus(204);

};

function fileDeletion(id) {

        File.findById(id, function (err, doc){

          if(doc){
            fs.unlink(utils.uploads + doc.fsFilePath, function (err) {
                if (err) throw err;
                handlelog('successfully deleted /uploads/' + doc.fsFilePath);
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
    const id = req.params.id;
    handlelog("updateFileBook " + req.params.id)
    File.findById(id, function (err, doc){
        doc.fsBooked = 1;
        doc.save();
    });

    res.status(200).send(id);
};

exports.addExportFile = addExportFile;

function handleError(err){
    console.error(err);
}

function handlelog(log){
    console.error(log);
}