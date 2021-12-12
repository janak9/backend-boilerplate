import _ from "lodash";
import { ValidationErrorCode, RequestInputErrorCode } from "./errors";
import { logging } from "./logging";

const ErrorResponseHandler = (res, error, message) => {
  if (error.name == "MongooseError" || error.name == "MongoError") {
    return res.status(400).send({ success: false, error: true, message: error.message });
  }
  if (
    error.error_code === ValidationErrorCode ||
    error.error_code === RequestInputErrorCode
  ) {
    return res
      .status(400)
      .send({ ...error.response_data, message: error.message });
  }
  logging.error(`Error stack - ${message} - ${error.stack}`);
  res.status(500).send({ success: false, error: true, message: `Something wrong happened` });
};

const ErrorHandler = (error, message) => {
  if (
    error &&
    (
      error.error_code === ValidationErrorCode ||
      error.error_code === RequestInputErrorCode
    )
  ) {
    return {
      success: false,
      error: {
        ...error.response_data,
        message: error.message,
      },
    };
  } else {
    logging.error(`Error stack - GQL - ${message} - ${error && error.stack}`);
    return {
      success: false,
      error: {
        error: true,
        message: "Something wrong",
      },
    };
  }
};

export {
  ErrorResponseHandler,
  ErrorHandler,
};
