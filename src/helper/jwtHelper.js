import jwt from "jsonwebtoken";
import { logging } from "./logging";
const secret = process.env.SECRET;

const generate_jwt_token_data = (user, extra_data = {}) => {
  return {
    _id: user._id,
    countryISDCode: user.countryISDCode,
    mobileNumber: user.mobileNumber,
    email: user.email,
    userType: user.userType,
    ...extra_data,
  };
};

const sign = (user, extra_data = {}, expiresIn) => {
  const options = {};
  expiresIn && (options.expiresIn = expiresIn);
  return jwt.sign(generate_jwt_token_data(user, extra_data), secret, options);
};

const verify = async (token) => {
  try {
    const jwt_token = token.split(" ");
    if (jwt_token[0] !== "JWT") throw Error("invalid token");
    const jwtToken = jwt_token[1] || "";
    const data = await jwt.verify(jwtToken, secret);
    return { data, token: jwtToken };
  } catch (error) {
    if (error.message !== "invalid token") logging.error(`Error occurred while verifing token - ${error.message}`);
    return { error };
  }
};

export default {
  sign,
  verify,
};
