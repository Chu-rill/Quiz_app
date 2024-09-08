const joi = require("joi");

exports.register_query_validator = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.login_query_validator = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.create_quiz_validator = joi.object({
  title: joi.string().required(),
  category: joi.string().required(),
  questions: joi
    .array()
    .items(
      joi.object({
        questionText: joi.string().required(),
        options: joi
          .array()
          .items(
            joi.object({
              text: joi.string().required(),
              isCorrect: joi.boolean().required(),
            })
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
});
