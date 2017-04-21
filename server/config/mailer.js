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
  const _DateCreated = utils.dpFormatDate(body.dvCreated);
  const emailType = "Deviation";
  const emailActivity = `<b>Deviation - </b><em>${body.dvNo}</em> </br>
         <b> Deviation Description:</b><i>${body.dvMatName} <b> Date Created</b> ${_DateCreated}</i>`;

   const p = new Promise(function(resolve, reject) {
       const toEmail = Users.getUserEmail(body.dvAssign);
      setTimeout(() => resolve(toEmail), 2000);
   });

   p.then(function(res){
       const _toEmail = res[0].email;
       sendMail(_toEmail, emailType, emailActivity);
   });

   p.catch(function (err) {
     utils.handleError(err);
   });
}

exports.createEmail = createEmail;
