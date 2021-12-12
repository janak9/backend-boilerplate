
export const verify_auth_token = async (token) => {}

export const register_user = async (data) => {};

export const login = async (data) => {};

/**
 *
 * @param {*} data
 * @data userId required
 * @data countryISDCode required
 * @data mobileNumber required
 * @data deviceType optional
 *
 */
export const send_OTP = async (data) => {};

/**
 *
 * @param {*} data
 * @data user {*} required
 * @data code required
 *
 */
export const verify_OTP = async (data) => {};

export const logout_user = async (user_id, device_id) => {
  return { success: true, message: "user logout successfully." };
};
