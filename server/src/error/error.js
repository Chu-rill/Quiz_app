module.exports = {
  noDuplicateError: {
    status: "error",
    error: true,
    message: "already exists",
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

  // handleValidationError: (err) => {
  //   // Ensure the errors object exists
  //   const errors = err.errors || {}; // Default to an empty object if not defined

  //   // Get the error fields from the errors object
  //   const error_fields = Object.keys(errors);
  //   console.log("Errors:", errors); // Log the actual errors

  //   return {
  //     status: "error",
  //     error: true,
  //     message: "Invalid Fields",
  //     fields: error_fields,
  //     statusCode: 400,
  //   };
  // },

  doesNotExistError: {
    status: "error",
    error: true,
    statusCode: 400,
    message: "does not exist",
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
