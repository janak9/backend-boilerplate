import twilio from "twilio";
import PhoneNumber from 'awesome-phonenumber';
import { ValidationError } from "./errors";
import { logging } from "./logging";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from_number = process.env.TWILIO_FROM_NUMBER;

/**
 * generate random OTP number
 *
 * @param otp_length optional, default 6
 * @returns number
 */
 export const generateOTP = (otp_length = 6) => {
  const digits = "0123456789";
  let otp = "";

  while(otp.length !== otp_length) {
    const index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }

  return otp;
}

/**
 * send OTP number
 *
 * @param to_number
 * @param message_body
 * @returns 
 */
export const sendOTP = async (to_number, message_body) => {
  try {
    if (!to_number) throw new ValidationError("to number is required");
    if (!message_body) throw new ValidationError("message body is required");

    const phone = PhoneNumber(to_number);
    if (!phone.getRegionCode()) throw new ValidationError('Please enter valid country code');
    if (!phone.isValid()) throw new ValidationError('Please enter valid phone number with country code');

    const client = twilio(accountSid, authToken);
    const data = await client.messages.create({
        body: message_body,
        from: from_number,
        to: phone.getNumber('e164'),
      })
    return { data };
  } catch (error) {
    logging.error(`Error occurred while sending OTP - ${error.message}`);
    return { error };
  }
};
