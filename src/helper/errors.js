const ValidationErrorCode = 'ValidationError';
const RequestInputErrorCode = 'RequestInputError';

class ValidationError extends Error { // when user enter wrong data then display validation error to user
  constructor(message, code = ValidationErrorCode) {
    super(message);
    this.error_code = code;
    this.response_data = {
      success: false,
      validation_error: true
    };
  }
}

class RequestInputError extends Error { // when something is wrong in request but it's not user's issue
  constructor(message, code = RequestInputErrorCode) {
    super(message);
    this.error_code = code;
    this.response_data = {
      success: false,
      error: true
    };
  }
}

export {
  ValidationErrorCode,
  RequestInputErrorCode,
  ValidationError,
  RequestInputError,
};
