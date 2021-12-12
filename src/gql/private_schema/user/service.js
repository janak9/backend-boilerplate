import _ from "lodash";
import { ErrorHandler } from "../../../helper/response";
import { authModule, userModule } from "../../../modules";
import { userOP } from "../../../database/controllers/index";

export const user_details = async (parent, args, context, info) => {
  try {
    const user = await userOP.find_by_id(context.user._id, { with_meta_data: true }).lean()
    return { success: true, user: user };
  } catch (error) {
    return ErrorHandler(error, "user details");
  }
};


export const send_OTP = async (parent, args, context, info) => {
  try {
    const posted_data = args.input;
    return await authModule.send_OTP({
      userId: context.user._id,
      countryISDCode: context.user.countryISDCode,
      mobileNumber: context.user.mobileNumber,
      deviceType: posted_data.device_type,
    });
  } catch (error) {
    return ErrorHandler(error, "send OTP");
  }
};

export const verify_OTP = async (parent, args, context, info) => {
  try {
    const posted_data = args.input;
    return await authModule.verify_OTP({
      user: context.user,
      ...posted_data,
    });
  } catch (error) {
    return ErrorHandler(error, "verify OTP");
  }
};

export const update_user = async (parent, args, context, info) => {
  try {
    const posted_data = args.input;    
    const user = await userOP.find_by_id(context.user._id).lean();
    const response = await userModule.edit(context.user._id, posted_data);
    return { ...response, user: response.data };
  } catch (error) {
    return ErrorHandler(error, "update user");
  }
};

export const logout = async (parent, args, context, info) => {
  try {
    const device_id = _.get(context, 'user.user_device._id');
    const user_id = _.get(context, 'user._id');
    return await authModule.logout_user(user_id, device_id);
  } catch (error) {
    return ErrorHandler(error, "logout user");
  }
};
