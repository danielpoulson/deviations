const passport = require('passport');

exports.authenticate = function(req, res, next) {
  req.body.username = req.body.username.toLocaleLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false});}
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({success:true, user: makeUserSafe(user)});
    });
  });
  auth(req, res, next);
};

// TODO: LOW 4 Block routes based on admin
// Example in the auth files deviationDB
function loginRequired (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
      res.status(403);
      res.end();
    }
}

function makeUserSafe (user) {
    var safeUser = {};

    var safeKeys = ['id', 'fullname', 'email', 'username', 'dept', 'role'];

    safeKeys.forEach(function (key) {
        safeUser[key] = user[key];
    });
    return safeUser;
}


exports.required = loginRequired;
exports.safe = makeUserSafe;
