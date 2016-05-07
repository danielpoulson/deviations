const User = require('mongoose').model('User');
const passport = require('passport');
const crypto = require('../config/cryptopass');

exports.getAllUsers = function(req, res) {
    var status = req.params.status;

    User
        .find({})
        .select({fullname : 1, "_id" : 0})
        .sort({fullname : 1})
        .exec(function(err, collection) {

          var users = collection.map(function(user) {
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
      if (err){console.log(err); res.sendStatus(500);}
      res.sendStatus(200);
    });

};

exports.getLoggedUser = function(req, res) {
  res.send({success:true, user: makeUserSafe(req.user)});
};

exports.getUser = function(req, res) {
    var _fullname = req.params.id;

    User
        .find({})
        .select({"passwordHash": 0})
        .where({fullname : _fullname})
        .exec(function(err, collection) {
          res.send(collection);
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

  var userData = req.body;

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
    var id = req.params.id;

    User.remove({_id: id}, function (err) {
        if (err) return handleError(err);
        res.status(200);
    });



};

// TODO: LOW Duplicate code with auth.js
function makeUserSafe (user) {
    var safeUser = {};

    var safeKeys = ['id', 'fullname', 'email', 'username', 'dept', 'role'];

    safeKeys.forEach(function (key) {
        safeUser[key] = user[key];
    });
    return safeUser;
}
