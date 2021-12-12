"use strict";
import _ from 'lodash';
import { ErrorHandler } from '../../../helper/response';
import { authModule } from '../../../modules';

export const login = async (parent, args, context, info) => {
  try {
    const response = await authModule.login(args.input);

    return {
      success: _.get(response, "success", null),
      user: {
        ..._.get(response, "data", {}),
        auth_token: _.get(response, "authorization", null)
      }
    };
  } catch (error) {
    return ErrorHandler(error, "login");
  }
};

export const register = async (parent, args, context, info) => {
  try {
    const response = await authModule.register_user(args.input);
  
    return {
      success: _.get(response, "success", false),
      user:  {
        ..._.get(response, "data", {}),
        auth_token: _.get(response, "authorization", null)
      }
    };
  } catch (error) {
    return ErrorHandler(error, "register");
  }
};
