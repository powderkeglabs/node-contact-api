var validator = require('validator');

// Validate the request
module.exports = function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;

  // Validate and sanitize name
  if (!name) {
    return res.status(400).send('Name is required');
  }
  req.body.name = validator.escape(name);

  // Validate email address
  if (!validator.isEmail(email)) {
    return res.status(400).send('Email is required');
  }

  // Santizie optional phone number
  if (phone) {
    req.body.phone = validator.escape(phone);
  } else {
    req.body.phone = '';
  }

  next();
};
