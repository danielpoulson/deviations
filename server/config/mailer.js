var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var connection = require('./config');
var path = require('path');
var rootPath = path.normalize(__dirname);
var fs = require('fs');

exports.sendMail = function(toEmail, emailType, emailActivity) {
  var emailSubject = "You have been assigned ownership of a " + emailType;
  // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)

  var auth = {
    auth: connection.mailgun
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  fs.readFile(rootPath + '/mail.html', 'utf8', function(err, html){
      if (err) {
        console.log('Error: ' + err);
      }
    var html = '<html><body STYLE="font-size: 12pt/14pt; font-family:sans-serif"><h3>You have been assigned ownership of this '
    + emailType + '</h3></br>' + emailActivity + '</br>' + html + '</body></html>';

    nodemailerMailgun.sendMail({
        from: 'changecontrol@fmc.com',
        to: toEmail, // An array if you have multiple recipients.
        subject: emailSubject,
        html: html,
      },
      function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
    });
  });


};
