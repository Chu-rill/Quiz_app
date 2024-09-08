module.exports = {
  noDuplicateUserError: {
    status: "error",
    error: true,
    message: "User already exists",
    statusCode: 400,
  },

  handleValidationError: (err) => {
    let { errors } = err;

    let error_fields = Object.keys(errors);

    return {
      status: "error",
      error: true,
      message: "Invalid Fields",
      fields: error_fields,
      statusCode: 400,
    };
  },

  userNotExistError: {
    status: "error",
    error: true,
    statusCode: 400,
    message: "User does not exist",
  },

  passwordMismatchError: {
    status: "error",
    error: true,
    message: "Invalid password",
    statusCode: 400,
  },

  invalidTokenError: {
    status: "error",
    error: true,
    message: "Invalid token",
    statusCode: 400,
  },

  invalidVerificationEmail: {
    status: "error",
    error: true,
    statusCode: 500,
    message: "Invalid verification email",
  },

  defaultError: {
    status: "error",
    error: true,
    statusCode: 500,
    message: "Internal Server Error",
  },
};
