import _ from "lodash";
import { ErrorResponseHandler } from "../../helper/response";
import { authModule } from "../../modules";

const register = async (req, res) => {
  try {
    const posted_data = req.body;
    const response = await authModule.register_user(posted_data);

    return res
      .header({ authorization: response.authorization })
      .status(201)
      .json({ ...response });
  } catch (error) {
    return ErrorResponseHandler(res, error, "registering user");
  }
};

const login = async (req, res) => {
  try {
    const posted_data = req.body;
    const response = await authModule.login(posted_data);

    return res
      .header({ authorization: response.authorization })
      .status(200)
      .json({ ...response });
  } catch (error) {
    return ErrorResponseHandler(res, error, "login");
  }
};

const logout_user = async (req, res) => {
  try {
    const device_id = _.get(req, 'user.user_device._id');
    const user_id = _.get(req, 'user._id');
    await authModule.logout_user(user_id, device_id);
    return res.json({ success: true, message: "user logout successfully." });
  } catch (error) {
    return ErrorResponseHandler(res, error, "logout_user");
  }
};

export default {
  register,
  login,
  logout_user,
};
