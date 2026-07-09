export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
  PENDING_VERIFICATION: "pending_verification",
  SUSPENDED: "suspended",
};

export const OTP_PURPOSE = {
  REGISTER: "register",
  LOGIN: "login",
  PASSWORD_RESET: "password_reset",
  PHONE_VERIFY: "phone_verify",
  EMAIL_VERIFY: "email_verify",
};

export const LOGIN_STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
};

export const DEVICE_TYPE = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
  OTHER: "other",
};

export const SOCIAL_PROVIDER = {
  GOOGLE: "google",
};

export const USER_TYPE = {
  BUYER: "buyer",
  SELLER: "seller",
};

export const USER_TYPE_TO_ROLE = {
  [USER_TYPE.BUYER]: "customer",
  [USER_TYPE.SELLER]: "vendor_owner",
};

export const AUTH_COOKIE = {
  REFRESH_TOKEN: "refreshToken",
};

export const LOCKOUT = {
  MAX_ATTEMPTS: 5,
  LOCK_MINUTES: 15,
};

export const TOKEN_EXPIRY = {
  EMAIL_VERIFICATION_HOURS: 24,
};
