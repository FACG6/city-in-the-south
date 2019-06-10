const joi = require('joi');

exports.loginSchema = joi.object().keys({
  username: joi.string().min(3).required(),
  pass: joi.string().min(8).required(),
});
