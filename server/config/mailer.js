"use strict";
/*eslint no-console: 0*/
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const Users = require('../controllers/users');
const config = require('./config');
const utils = require('./utils');
const path = require('path');
const fs = require('fs');
const rootPath = path.normalize(__dirname);


function sendMail(toEmail, emailType, emailActivity) {
  const emailSubject = "You have been assigned ownership of a " + emailType;
  // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
  let _auth = {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: config.auth.user,
            clientId: config.auth.clientId,
            clientSecret: config.auth.clientSecret,
            refreshToken: config.auth.refreshToken,
            accessToken: config.auth.accessToken
        })
    };

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: _auth
  });

  fs.readFile(rootPath + '/mail.html', 'utf8', function(err, html){
      if (err) {
        console.log('Error: ' + err);
      }
    const _html = '<html><body STYLE="font-size: 12pt/14pt; font-family:sans-serif"><h3>You have been assigned ownership of this '
    + emailType + '</h3></br>' + emailActivity + '</br>' + html + '</body></html>';

    transporter.sendMail({
        from: config.auth.user,
        to: toEmail, // An array if you have multiple recipients.
        subject: emailSubject,
        html: _html
      },
      function (err, info) {

      if (err) {
        console.log('Error: ' + err);
      }
      transporter.close();
    });
  });
}

function createEmail(body){
  const _formattedDate = utils.dpFormatDate(body.emailDate);
  const emailType = body.emailType;
  const emailActivity = `<b>${emailType}- </b><em>${body._id}</em> </br>
         <b> ${emailType}:</b><i>${body.name} <b> ${body.dateHeader}</b> ${_formattedDate}</i>`;

  Users.getUserEmail(body.assigned).exec((err, doc) => {
     sendMail(doc[0].email, emailType, emailActivity);
 });

}

exports.createEmail = createEmail;
