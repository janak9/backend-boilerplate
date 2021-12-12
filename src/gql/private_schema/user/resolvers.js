import * as service from "./service";

export const resolvers = {
  Query: {
    user: (...params) => service.user_details(...params),
  },
  Mutation: {
    send_OTP: (...params) => service.send_OTP(...params),
    verify_OTP: (...params) => service.verify_OTP(...params),
    update_user: (...params) => service.update_user(...params),
    logout: (...params) => service.logout(...params),
  }
};
