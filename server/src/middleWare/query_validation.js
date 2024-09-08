const joi = require("joi");

exports.register_query_validator = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.login_query_validator = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
