import { authModule } from "../modules";

module.exports = async function (req, res, next) {
  const token = req.headers.authorization;
  const verify_res = await authModule.verify_auth_token(token);
  if (verify_res.success) {
    req.user = verify_res.user;
    return next();
  } else {
    return res.send(verify_res);
  }
};
