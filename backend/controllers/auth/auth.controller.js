import asyncHandler from "../../utils/asyncHandler.js";
import { getRequestMeta } from "../../utils/request.js";
import { AUTH_COOKIE } from "../../constants/auth.js";
import { getRefreshCookieOptions } from "../../services/token.service.js";
import * as authService from "../../services/auth.service.js";
import {
  validateRegister,
  validateLogin,
  validateEmailOnly,
  validateVerifyEmail,
} from "../../validators/auth.validator.js";

function setRefreshCookie(res, refreshToken) {
  res.cookie(AUTH_COOKIE.REFRESH_TOKEN, refreshToken, getRefreshCookieOptions());
}

function clearRefreshCookie(res) {
  const { maxAge: _maxAge, ...options } = getRefreshCookieOptions();
  res.clearCookie(AUTH_COOKIE.REFRESH_TOKEN, options);
}

export const register = asyncHandler(async (req, res) => {
  const data = validateRegister(req.body);
  const result = await authService.register(data, getRequestMeta(req));

  res.status(201).json({
    success: true,
    ...result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const data = validateLogin(req.body);
  const result = await authService.login(data, getRequestMeta(req));

  setRefreshCookie(res, result.refreshToken);

  res.status(200).json({
    success: true,
    message: "Signed in successfully",
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[AUTH_COOKIE.REFRESH_TOKEN];
  await authService.logout(refreshToken, getRequestMeta(req));
  clearRefreshCookie(res);

  res.status(200).json({
    success: true,
    message: "Signed out successfully",
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies[AUTH_COOKIE.REFRESH_TOKEN];
  const result = await authService.refreshAccessToken(refreshToken);

  setRefreshCookie(res, result.refreshToken);

  res.status(200).json({
    success: true,
    user: result.user,
    accessToken: result.accessToken,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const token =
    req.method === "GET" ? req.query.token : req.body?.token;
  const data = validateVerifyEmail({ token });
  const result = await authService.verifyEmail(data.token);

  res.status(200).json({
    success: true,
    ...result,
  });
});

export const resendVerification = asyncHandler(async (req, res) => {
  const data = validateEmailOnly(req.body);
  const result = await authService.resendVerificationEmail(data.email);

  res.status(200).json({
    success: true,
    ...result,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.userId);

  res.status(200).json({
    success: true,
    user,
  });
});
