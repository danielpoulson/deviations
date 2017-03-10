"use strict";
const User = require('mongoose').model('User');
const passport = require('passport');
const crypto = require('../config/cryptopass');
const utils = require('../config/utils');
const auth = require('../config/auth');


exports.getAllUsers = function(req, res) {
    const status = req.params.status;

    User
        .find({fullname: { $exists: true}})
        .select({fullname : 1, "_id" : 0})
        .sort({fullname : 1})
        .exec(function(err, collection) {

          const users = collection.map(function(user) {
            return user.fullname;
          });

          res.send(users);
    });
};

exports.updateUser = function (req, res, next) {
    const password = req.body.password;
    const userData = {};

    userData.username = req.body.username;
    userData.fullname = req.body.fullname;
    userData.email = req.body.email;
    userData.role = req.body.role;

    if (password) {
      userData.passwordHash = crypto.hash(password);
    }

    User.update({_id : req.body._id}, {$set: userData}, function (err) {
      if (err){
        utils.handleError(err);
        res.sendStatus(500);
      }

      res.sendStatus(200);

    });

};

exports.getLoggedUser = function(req, res) {
  res.send({success:true, user: auth.safe(req.user)});
};

exports.getUser = function(req, res) {
    const _fullname = req.params.id;

    User
        .find({})
        .select({"passwordHash": 0})
        .where({fullname : _fullname})
        .exec(function(err, collection) {
          const _user = auth.safe(collection[0]);
          res.send(_user);
    });
};

exports.getFullname = function(username) {
    return User
        .find({})
        .select({ "fullname": 1, "_id": 0 })
        .where({ username: username});
};

exports.getUserEmail = function(user) {
  return User.find({fullname : user},{email:1, "_id" : 0});

};

exports.createUser = function (req, res, next) {

  const userData = req.body;

  userData.username = userData.username.toLowerCase();
  userData.passwordHash = crypto.hash(userData.password);


  User.create(userData, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }

    res.sendStatus(200);
  });

};

exports.deleteUser= function (req, res) {
    const id = req.params.id;

    User.remove({_id: id}, function (err) {
        if (err) { utils.handleError(err); }
        res.status(200);
    });



};
