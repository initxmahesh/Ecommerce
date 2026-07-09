import jwt from "jsonwebtoken";
import env from "../config/env.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/index.js";
import { USER_STATUS } from "../constants/auth.js";
import { verifyAccessToken } from "../services/token.service.js";

export function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401, "UNAUTHORIZED"));
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    req.sessionId = payload.sid;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Access token expired", 401, "TOKEN_EXPIRED"));
    }
    return next(new AppError("Invalid access token", 401, "INVALID_TOKEN"));
  }
}

export async function loadUser(req, _res, next) {
  try {
    const user = await User.findOne({
      _id: req.userId,
      deletedAt: null,
    });

    if (!user) {
      return next(new AppError("User not found", 404, "USER_NOT_FOUND"));
    }

    if (user.status === USER_STATUS.BLOCKED) {
      return next(new AppError("Account has been blocked", 403, "ACCOUNT_BLOCKED"));
    }

    if (user.status === USER_STATUS.SUSPENDED) {
      return next(new AppError("Account has been suspended", 403, "ACCOUNT_SUSPENDED"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
