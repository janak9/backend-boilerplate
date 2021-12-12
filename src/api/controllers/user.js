import _ from "lodash";
import { userOP } from "../../database/controllers/index";
import { ErrorResponseHandler } from "../../helper/response";
import { authModule, userModule } from "../../modules";

const fetch = async (req, res) => {
  try {
    const user = await userOP.find_by_id(req.user._id, { with_meta_data: true }).lean();
    return res.json({ success: true, data: user });
  } catch (error) {
    return ErrorResponseHandler(res, error, "fetch user");
  }
};

const send_otp = async (req, res) => {
  try {
    const posted_data = req.body;
    const response = await authModule.send_OTP({
      userId: req.user._id,
      countryISDCode: req.user.countryISDCode,
      mobileNumber: req.user.mobileNumber,
      deviceType: posted_data.deviceType,
      isTest: posted_data.isTest,
    });
    return res.json(response);
  } catch (error) {
    return ErrorResponseHandler(res, error, "send otp");
  }
};

const verify_otp = async (req, res) => {
  try {
    const posted_data = req.body;
    posted_data.verify = true;
    const response = await authModule.verify_OTP({
      user: req.user,
      ...posted_data,
    });
    return res.json(response);
  } catch (error) {
    return ErrorResponseHandler(res, error, "verify otp");
  }
};

const edit = async (req, res) => {
  try {
    const posted_data = req.body;
    const response = await userModule.edit(req.user._id, posted_data);
    return res.json(response);
  } catch (error) {
    return ErrorResponseHandler(res, error, "edit user");
  }
};

const fetch_user_by_id = async (req, res) => {
  try {
    const users = await userOP
    .find_by_id(req.params.userId, { with_meta_data: true })
    .populate("pictures")
    .lean();
    return res.json({ success: true, data: users });
  } catch (error) {
    return ErrorResponseHandler(res, error, "fetch all users");
  }
};

const edit_by_admin = async (req, res) => {
  try {
    const posted_data = req.body;
    const response = await userModule.edit_by_admin(req.user._id, posted_data);
    return res.json(response);
  } catch (error) {
    return ErrorResponseHandler(res, error, "edit user by admin");
  }
};

export default {
  fetch,
  send_otp,
  verify_otp,
  edit,
  fetch_user_by_id,
  edit_by_admin,
};
