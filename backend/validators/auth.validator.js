import AppError from "../utils/AppError.js";
import { USER_TYPE } from "../constants/auth.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireField(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new AppError(`${fieldName} is required`, 400, "VALIDATION_ERROR");
  }
}

function validateEmail(email) {
  requireField(email, "Email");
  if (!EMAIL_REGEX.test(email)) {
    throw new AppError("Invalid email format", 400, "VALIDATION_ERROR");
  }
}

function validatePassword(password) {
  requireField(password, "Password");
  if (password.length < 8) {
    throw new AppError(
      "Password must be at least 8 characters",
      400,
      "VALIDATION_ERROR",
    );
  }
}

export function validateRegister(body) {
  requireField(body.name, "Name");
  validateEmail(body.email);
  validatePassword(body.password);

  if (!Object.values(USER_TYPE).includes(body.userType)) {
    throw new AppError(
      "userType must be buyer or seller",
      400,
      "VALIDATION_ERROR",
    );
  }

  return {
    name: body.name.trim(),
    email: body.email.trim(),
    password: body.password,
    userType: body.userType,
  };
}

export function validateLogin(body) {
  validateEmail(body.email);
  requireField(body.password, "Password");

  return {
    email: body.email.trim(),
    password: body.password,
  };
}

export function validateEmailOnly(body) {
  validateEmail(body.email);
  return { email: body.email.trim() };
}

function normalizeToken(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const token = Array.isArray(value) ? value[0] : value;

  if (typeof token !== "string" || token.trim() === "") {
    return null;
  }

  return token.trim();
}

export function validateVerifyEmail(body) {
  const token = normalizeToken(body.token);
  if (!token) {
    throw new AppError("Token is required", 400, "MISSING_TOKEN");
  }

  return { token };
}
