// User userTypes
export const ADMIN = "A";
export const MONITOR = "M";
export const USER = "U";
export const UserTypes = [ADMIN, MONITOR, USER];

// User status
export const Active = "A";
export const Deactivated = "D";
export const Removed = "R";
export const AdminBlocked = "AB";
export const UserStatus = [Active, Deactivated, Removed, AdminBlocked];

export const invalid_token_payload = {
  invalid_token: true,
  message: "Session time out, Please login again",
};

export const MAX_BACKUP_DAY_LIMIT = 7;
