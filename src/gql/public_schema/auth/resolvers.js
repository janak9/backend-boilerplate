import { login, register } from "./service";

export const resolvers = {
  Query: {
    health: () => { return "Ok, working fine." },
  },
  Mutation: {
    login: (...params) => login(...params),
    register: (...params) => register(...params),
  }
};
