'use strict';

var env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
var configDev = (env === 'development') ? require('./config-dev') : {};

var config = {
  development: {
    mail: {
      host: 'smtp.mandrillapp.com',
      port: 587,
      auth: {
        user: configDev.MAIL_USER,
        pass: configDev.MAIL_PASS
      }
    }
  },
  production: {
    mail: {
      host: 'smtp.mandrillapp.com',
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    }
  }
};

module.exports = config[env];
