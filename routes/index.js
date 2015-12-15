'use strict';

var express = require('express');
var router = express.Router();
var mail = require('../lib/mail');
var mailValidate = require('../lib/validate');
var sprintf = require('sprintf-js').sprintf;

// Status Check For App Monitoring
router.get('/', function(req, res) {
  res.send('OK');
});

router.post('/Contact/quorum', mailValidate, function(req, res) {
  var appConfig = require('../config/config')('quorum');
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;

  var data = {
    fromName: appConfig.name,
    fromEmail: appConfig.email,
    to: appConfig.email,
    replyTo: sprintf('%s <%s>', name, email),
    subject: sprintf(appConfig.subject, name),
    text: sprintf(appConfig.message, name, email, phone)
  };

  mail.sendEmail(data, function(err, message) {
    if (err) {
      console.error('Error sending message: ', err);
      res.sendStatus(500);
      return;
    }
    res.send(message);
  });
});

module.exports = router;
