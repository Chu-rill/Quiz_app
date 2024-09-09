const { defaultError } = require("../error/error");
const { submit_score_validator } = require("../middleWare/query_validation");
const Leaderboard = require("../models/leaderboard_model");

const submit_score = async (userId, category, score, quizId) => {
  //validate user data
  const { error } = submit_score_validator.validate({
    userId,
    category,
    score,
    quizId,
  });
  if (error) {
    return {
      status: "error",
      error: true,
      message: error.details[0].message,
      statusCode: 400,
    };
  }

  try {
    const leaderboard = await Leaderboard.updateScore(
      userId,
      category,
      score,
      quizId
    );
    return {
      status: "success",
      error: false,
      statusCode: 200,
      message: "Score updated",
      leaderboard,
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};

const get_scores = async () => {
  try {
    const score = await Leaderboard.find();

    return {
      status: "success",
      error: false,
      statusCode: 200,
      score,
    };
  } catch (error) {
    console.log(error);
    return defaultError(error);
  }
};
module.exports = { submit_score, get_scores };
