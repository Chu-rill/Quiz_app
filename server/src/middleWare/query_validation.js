const Joi = require("joi");
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
  level: joi.string().required(),
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
exports.submit_score_validator = joi.object({
  userId: joi.object().required(),
  category: joi.string().required(),
  score: joi.number().required(),
  quizId: joi.string().required(),
});
exports.quizzes_byCategory_validator = joi.object({
  category: joi.string().required(),
});
exports.quizzes_byLevel_validator = joi.object({
  level: joi.string().required(),
});
