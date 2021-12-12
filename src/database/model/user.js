const {
  UserTypes,
  USER,
  UserStatus,
  Step1,
} = require("../../helper/constants");

module.exports = (mongoose, Schema) => {
  const userSchema = new Schema(
    {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
      countryISDCode: {
        type: String,
        trim: true,
        required: true,
      },
      mobileNumber: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        index: true
      },
      timeOfBirth: {
        type: String,
        trim: true,
      },
      education: {
        type: Schema.Types.ObjectId,
        ref: "subTypes",
      },
      gender: {
        type: Schema.Types.ObjectId,
        ref: "subTypes",
        index: true
      },
      userType: {
        type: String,
        trim: true,
        enum: UserTypes,
        default: USER,
      },
      status: {
        type: String,
        trim: true,
        enum: UserStatus,
        default: Step1,
      },
    },
    {
      collection: "users",
      timestamps: true,
    }
  );

  return mongoose.model("users", userSchema);
};
