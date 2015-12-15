'use strict';

var mailConfig = require('../config/mail');
var nodemailer = require('nodemailer');

// var smtpTransport = require('nodemailer-smtp-transport');
// var transport = nodemailer.createTransport(smtpTransport(mailConfig.mail));

var Mandrill = require('mandrill-api');
var MandrillClient = new Mandrill.Mandrill(mailConfig.mail.mandrillApiKey);

var Mailer = {};

// Mailer.sendEmail = function(data, cb) {
//   transport.sendMail(data, function(err, msg) {
//     if (err) {
//       console.error('Error with SMTP: ', err);
//       return cb(err, msg);
//     }
//     console.log('Sent', msg);
//     cb(null, msg);
//   });
// };

Mailer.sendEmail = function(data, cb) {
  MandrillClient.messages.send({
    message: {
      text: data.text,
      subject: data.subject,
      from_email: data.fromEmail,
      from_name: data.fromName,
      to: [{email: data.to}],
      headers: {
        'Reply-to': data.from
      }
    }
  }, function(info) {
    console.log('Sent: ', info);
    return cb(null, info);
  }, function(err) {
    console.error('Error Sending  With Mandrill', err);
    return cb(err, null);
  });
};

module.exports = Mailer;
