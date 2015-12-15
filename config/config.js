// Determin which app config to load
'use strict';

var path = require('path');
module.exports = function(appId) {
  var config;

  // Check if this app exists
  try {
    config = require(path.resolve(__dirname, appId));
  } catch (err) {
    console.error(err);
    return null;
  }

  return config;
};
