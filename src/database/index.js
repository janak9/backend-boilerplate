import mongoose from "mongoose";
const Schema = mongoose.Schema;

// table configurations
const User = require("./model/user")(mongoose, Schema);


export {
  User,
};
