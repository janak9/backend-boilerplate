import _ from "lodash";
import { ErrorHandler } from "../helper/response";
import {
  invalid_token_payload,
} from "../helper/constants";
import {
  authModule,
  userModule,
} from "../modules";
import { userOP } from "../database/controllers";

let all_connected_users = [];
const user_wise_chats = {};

const convert_to_JSON = (data) => {
  return JSON.parse(JSON.stringify(data));
}

export const get_or_verify_user = async (data, socket) => {
  try {
    let user = _.find(all_connected_users, { socketId: socket.id });
    if (user) return user;

    const verify_res = await authModule.verify_auth_token(data.auth_token);
    if (!verify_res.success || verify_res.invalid_token) return verify_res;

    user = convert_to_JSON(await userOP.find_by_id(verify_res.user._id).lean());
    if (!user) return invalid_token_payload;

    const user_socket_data = {
      socketId: socket.id,
      _id: user._id,
      user: user,
    };
    all_connected_users.push(user_socket_data);
    socket.join(user._id);
    return user_socket_data;
  } catch (error) {
    return ErrorHandler(error, "socket get_or_verify_user");
  }
};

export const update_user_online_status = async (user, isOnline) => {
  try {
    const users_sockets = [], other_users = [];
    _.map(all_connected_users, (item) => {
      item._id === user._id ? users_sockets.push(item) : other_users.push(item);
    });
    _.map(users_sockets, (item) => {
      item.user && (item.user.isOnline = isOnline);
      other_users.push(item);
      if (item.socketId === user.socketId) user = item;
    });

    const updated_user = await userModule.edit(user._id, { isOnline });
    all_connected_users = [...other_users];
    let user_chats = user_wise_chats[user._id];
    if (!user_chats) {
      await fetch_user_chats(user);
      user_chats = user_wise_chats[user._id];
    }
    user.user = updated_user.success ? convert_to_JSON(updated_user.data) : { ...user.user, isOnline: isOnline };
    return { user, user_chats };
  } catch (error) {
    return ErrorHandler(error, "socket update_user_online_status");
  }
};

export const disconnect = (socket) => {
  try {
    const index = all_connected_users.findIndex(
      (user) => user.socketId === socket.id
    );

    if (index !== -1) {
      const user = all_connected_users[index];
      all_connected_users.splice(index, 1);
      return user;
    }
  } catch (error) {
    return ErrorHandler(error, "socket disconnect");
  }
};
