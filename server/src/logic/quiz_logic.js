const {
  noDuplicateError,
  defaultError,
  handleValidationError,
  doesNotExistError,
} = require("../error/error");
const Quiz = require("../models/quiz_model");
const {
  create_quiz_validator,
  quizzes_byLevel_validator,
  quizzes_byCategory_validator,
} = require("../middleWare/query_validation"); // Import the Joi schema

const create_quiz = async (quiz_detail) => {
  //validate user data
  const { error } = create_quiz_validator.validate(quiz_detail);
  if (error) {
    return handleValidationError(error);
  }
  let { title, category, level, questions } = quiz_detail;
  try {
    const existingQuiz = await Quiz.findOne({ title });

    //if there is a title associated we return an error
    if (existingQuiz) return noDuplicateError;

    // Create the quiz
    const quiz = await Quiz.create({
      title,
      category,
      level,
      questions,
    });

    return {
      status: "success",
      error: false,
      statusCode: 201,
      quiz,
    };
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError" && error.errors) {
      return handleValidationError(error);
    }
    //we return a default error
    return defaultError(error);
  }
};

const getAllQuizzes = async (quiz_detail) => {
  try {
    const quizzes = await Quiz.find();

    if (!quizzes) return doesNotExistError;

    return {
      status: "success",
      error: false,
      statusCode: 200,
      quizzes,
    };
  } catch (error) {
    console.log(error);
    return defaultError(error);
  }
};

const getQuiz = async (quiz_id) => {
  let { id } = quiz_id;
  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) return doesNotExistError;

    return {
      status: "success",
      error: false,
      statusCode: 200,
      quiz,
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};

const getAllQuizzesByCategory = async (category) => {
  // if (!category) {
  //   return {
  //     status: "error",
  //     error: true,
  //     message: "Category is required.",
  //     statusCode: 400,
  //   };
  // }

  const { error } = quizzes_byCategory_validator.validate({ category });
  if (error) {
    return handleValidationError(error);
  }

  try {
    // Find quizzes by category
    let quizzes = await Quiz.find({ category: category });

    // If no quizzes are found in the specified category, return an appropriate message
    // if (!quizzes || quizzes.length === 0) {
    //   return {
    //     status: "error",
    //     error: true,
    //     message: `No quizzes found in the ${category} category.`,
    //     statusCode: 404,
    //   };
    // }

    if (!quizzes) return doesNotExistError;

    return {
      status: "success",
      error: false,
      statusCode: 200,
      quizzes,
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};

const getAllQuizzesByLevel = async (level) => {
  const { error } = quizzes_byLevel_validator.validate({ level });
  if (error) {
    return handleValidationError(error);
  }
  try {
    // Find quizzes by level
    let quizzes = await Quiz.find({ level: level });

    // If no quizzes are found in the specified category, return an appropriate message
    if (!level || level.length === 0) {
      return {
        status: "error",
        error: true,
        message: `No quizzes found in the ${level} level.`,
        statusCode: 404,
      };
    }

    return {
      status: "success",
      error: false,
      statusCode: 200,
      quizzes,
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};
const deleteQuiz = async (quizId) => {
  try {
    // Find and delete the user
    let quiz = await Quiz.findByIdAndDelete(quizId);

    if (!quiz) return doesNotExistError;

    return {
      status: "success",
      error: false,
      statusCode: 200,
      message: "Quiz deleted successfully",
    };
  } catch (error) {
    console.log(error);
    //we return a default error
    return defaultError;
  }
};

module.exports = {
  create_quiz,
  getAllQuizzes,
  getQuiz,
  getAllQuizzesByCategory,
  getAllQuizzesByLevel,
  deleteQuiz,
};
