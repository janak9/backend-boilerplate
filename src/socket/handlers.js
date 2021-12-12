import * as socketHelper from "./socketHepler";
import * as events from "./events";
import io from "./io";
import _ from "lodash";
import { ErrorHandler } from "../helper/response";
import { invalid_token_payload } from "../helper/constants";

export const invalid_token = async (socket) => {
  socket.emit(events.BACKEND_INVALID_TOKEN, invalid_token_payload);
};

export const something_wrong = async (socket, data) => {
  socket.emit(events.BACKEND_SOMETHING_WRONG, data);
};

export const valid_response = (socket, res) => {
  if (res.invalid_token) invalid_token(socket);
  if (res.success === false) something_wrong(socket, res);
  if (res.invalid_token || res.success === false) return false;
  return true;
};

export const socketErrorHandler = (error, socket, message) => {
  const error_res = ErrorHandler(error, message);
  return something_wrong(socket, error_res);
};

export const online = async (socket, data) => {
  try {
    const user = await socketHelper.get_or_verify_user(data, socket);
    if(!valid_response(socket, user)) return;

    const res = await socketHelper.update_user_online_status(user, true);
    if(!valid_response(socket, res)) return;
    const user_ids = new Set();
    res.user_chats.map((item) => {
      user_ids.add(item.user1Id.toString());
      user_ids.add(item.user2Id.toString());
    });
    socket.to([...user_ids]).emit(events.BACKEND_ONLINE, _.get(res, "user.user"));
  } catch (error) {
    return socketErrorHandler(error, socket, "handlers online");
  }
};

export const disconnect = async (socket, data) => {
  try {
    const user = socketHelper.disconnect(socket);
    if (!user) return;

    // update online status to false
    const res = await socketHelper.update_user_online_status(user, false);
    if(!valid_response(socket, res)) return;
    const user_ids = new Set();
    res.user_chats.map((item) => {
      user_ids.add(item.user1Id.toString());
      user_ids.add(item.user2Id.toString());
    });

    // check if user is online in another device
    socket.to(user._id.toString()).emit(events.BACKEND_IS_ONLINE, _.get(res, "user.user"));
  } catch (error) {
    return socketErrorHandler(error, socket, "handlers disconnect");
  }
};
