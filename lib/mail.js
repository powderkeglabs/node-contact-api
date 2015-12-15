'use strict';

var mailConfig = require('../config/mail');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport(mailConfig.mail));

var Mailer = {};

Mailer.sendEmail = function(data, cb) {
  transport.sendMail(data, function(err, msg) {
    if (err) {
      console.error('Error with SMTP: ', err);
      return cb(err, msg);
    }
    console.log('Sent', msg);
    cb(null, msg);
  });
};

module.exports = Mailer;
