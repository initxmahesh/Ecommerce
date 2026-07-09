import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { parseDuration } from "../utils/duration.js";

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateOpaqueToken() {
  return crypto.randomBytes(40).toString("hex");
}

export function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function signAccessToken(userId, sessionId) {
  return jwt.sign(
    { sub: userId.toString(), sid: sessionId?.toString() },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessExpires },
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

export function getRefreshCookieOptions() {
  return {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: parseDuration(env.jwt.refreshExpires),
  };
}
