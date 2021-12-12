import moment from "moment";
import _ from "lodash";
import validator from "validator";
import { userOP } from "../database/controllers/index";
import {
  UserStatus,
} from "../helper/constants";
import { RequestInputError, ValidationError } from "../helper/errors";

export const validate_user_data = (data) => {
  if (data.firstName && !validator.matches(data.firstName.toString(), /^[a-zA-Z ]+$/i))
    throw new ValidationError("First name should contain letters only");
  if (data.lastName && !validator.matches(data.lastName.toString(), /^[a-zA-Z ]+$/i))
    throw new ValidationError("Last name should contain letters only");
  if (data.email && !validator.isEmail(data.email.toString()))
    throw new ValidationError("Invalid email! Please enter valid email");
  if (data.dateOfBirth) {
    data.dateOfBirth = data.dateOfBirth.replace(/\//g, "-");
    if (new Date(data.dateOfBirth) == "Invalid Date")
      throw new ValidationError(
        "Invalid Date! please enter date in MM-DD-YYYY format."
      );
    data.dateOfBirth = new Date(data.dateOfBirth);
    const dob = new Date(
      data.dateOfBirth.toLocaleDateString() + ` ${data.timeOfBirth}`
    );
    if (dob === "Invalid Date")
      throw new ValidationError(
        "Invalid Date! please enter time in HH:mm format."
      );
    data.dateOfBirth = moment(new Date(data.dateOfBirth));
  }

  if (data.status && !UserStatus.includes(data.status))
    throw new RequestInputError(
      "status is not valid! Allowed status are " + UserStatus.join(", ")
    );
};

const create_user_edit_payload = (data) => {
  const update_data = {};

  if (data.firstName !== undefined) update_data.firstName = data.firstName;
  if (data.lastName !== undefined) update_data.lastName = data.lastName;
  if (data.email !== undefined) update_data.email = data.email;
  if (data.dateOfBirth) update_data.dateOfBirth = moment(data.dateOfBirth);
  if (data.timeOfBirth) update_data.timeOfBirth = data.timeOfBirth;
  if (data.status) update_data.status = data.status;

  return update_data;
};

/**
 *
 * @param userId required
 * @param {*} data
 *
 */
export const edit = async (userId, data) => {
  validate_user_data(data);
  const update_data = create_user_edit_payload(data);
  const user = await userOP.edit({ _id: userId }, update_data).lean();
  return { success: true, data: user };
};

/**
 *
 * @param userId required
 * @param {*} data
 *
 */
export const edit_by_admin = async (userId, data) => {
  validate_user_data(data);
  if (data.userType && !UserTypes.includes(data.userType))
    throw new ValidationError(
      "user type is not valid! Allowed types are " + UserTypes.join(", ")
    );
  if (data.countryISDCode && !data.mobileNumber)
    throw new ValidationError(
      "Mobile number field is required to update Country ISD Code"
    );
  if (!data.countryISDCode && data.mobileNumber)
    throw new ValidationError(
      "Country ISD Code field is required to update mobile number"
    );

  const update_data = create_user_edit_payload(data);

  if (data.userType) update_data.userType = data.userType;

  if (data.countryISDCode && data.mobileNumber) {
    if (!data.countryISDCode.startsWith("+"))
      data.countryISDCode = "+" + data.countryISDCode;

    const phone = PhoneNumber(data.countryISDCode + data.mobileNumber);
    if (!phone.getRegionCode())
      throw new ValidationError("Please enter valid Country ISD Code");
    if (!phone.isValid())
      throw new ValidationError("Please enter valid Mobile number");
    if (data.countryISDCode) update_data.countryISDCode = data.countryISDCode;
    if (data.mobileNumber)
      update_data.mobileNumber = phone.getNumber("significant");
  }

  const user = await userOP.edit({ _id: userId }, update_data).lean();
  return { success: true, data: user };
};
