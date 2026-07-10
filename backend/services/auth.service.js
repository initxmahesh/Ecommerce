import {
  User,
  Role,
  UserRole,
  UserDevice,
  Session,
  RefreshToken,
  LoginHistory,
  EmailVerification,
  AuditLog,
} from "../models/index.js";
import {
  USER_STATUS,
  LOGIN_STATUS,
  USER_TYPE,
  USER_TYPE_TO_ROLE,
  LOCKOUT,
  TOKEN_EXPIRY,
} from "../constants/auth.js";
import AppError from "../utils/AppError.js";
import env from "../config/env.js";
import { addDuration } from "../utils/duration.js";
import {
  generateOpaqueToken,
  generateVerificationToken,
  hashToken,
  signAccessToken,
} from "./token.service.js";
import { sendVerificationEmail } from "./email.service.js";

function splitName(name) {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function sanitizeUser(user, roles = []) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
    status: user.status,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
    twoFactorEnabled: user.twoFactorEnabled,
    preferredLanguage: user.preferredLanguage,
    lastLogin: user.lastLogin,
    roles,
    createdAt: user.createdAt,
  };
}

async function getUserRoles(userId) {
  const userRoles = await UserRole.find({ user: userId }).populate(
    "role",
    "name displayName",
  );

  return userRoles.map((ur) => ({
    name: ur.role.name,
    displayName: ur.role.displayName,
  }));
}

async function createAuditLog({ userId, action, resourceId, reqMeta }) {
  await AuditLog.create({
    user: userId,
    action,
    module: "auth",
    resource: "user",
    resourceId,
    ipAddress: reqMeta?.ipAddress,
    userAgent: reqMeta?.userAgent,
  });
}

async function assignRole(userId, userType) {
  const roleName = USER_TYPE_TO_ROLE[userType];
  const role = await Role.findOne({ name: roleName });

  if (!role) {
    throw new AppError(
      `Role "${roleName}" not found. Run database seeds first.`,
      500,
      "ROLE_NOT_FOUND",
    );
  }

  await UserRole.create({ user: userId, role: role._id });
  return role;
}

async function createEmailVerification(userId) {
  const token = generateVerificationToken();
  const expiresAt = addDuration(
    new Date(),
    `${TOKEN_EXPIRY.EMAIL_VERIFICATION_HOURS}h`,
  );

  await EmailVerification.deleteMany({ user: userId, isVerified: false });

  await EmailVerification.create({
    user: userId,
    token,
    expiresAt,
  });

  return token;
}

async function createAuthSession(user, reqMeta) {
  const device = await UserDevice.create({
    user: user._id,
    deviceName: reqMeta.deviceName,
    deviceType: reqMeta.deviceType,
    browser: reqMeta.browser,
    operatingSystem: reqMeta.operatingSystem,
    ipAddress: reqMeta.ipAddress,
    lastUsedAt: new Date(),
  });

  const sessionExpiresAt = addDuration(new Date(), env.jwt.refreshExpires);

  const session = await Session.create({
    user: user._id,
    device: device._id,
    ipAddress: reqMeta.ipAddress,
    userAgent: reqMeta.userAgent,
    expiresAt: sessionExpiresAt,
  });

  const refreshToken = generateOpaqueToken();
  const refreshExpiresAt = addDuration(new Date(), env.jwt.refreshExpires);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(refreshToken),
    device: device._id,
    expiresAt: refreshExpiresAt,
  });

  const accessToken = signAccessToken(user._id, session._id);

  return { accessToken, refreshToken, session, device };
}

async function recordFailedLogin(user, email, reason, reqMeta) {
  user.failedLoginAttempts += 1;

  if (user.failedLoginAttempts >= LOCKOUT.MAX_ATTEMPTS) {
    user.lockUntil = addDuration(new Date(), `${LOCKOUT.LOCK_MINUTES}m`);
  }

  await user.save();

  await LoginHistory.create({
    user: user._id,
    email,
    ipAddress: reqMeta.ipAddress,
    userAgent: reqMeta.userAgent,
    status: LOGIN_STATUS.FAILED,
    failureReason: reason,
    attempts: user.failedLoginAttempts,
  });
}

export async function register({ name, email, password, userType }, reqMeta) {
  if (!Object.values(USER_TYPE).includes(userType)) {
    throw new AppError("Invalid user type", 400, "INVALID_USER_TYPE");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({
    email: normalizedEmail,
    deletedAt: null,
  });

  if (existingUser) {
    throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");
  }

  const { firstName, lastName } = splitName(name);

  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    passwordHash: password,
    status: USER_STATUS.PENDING_VERIFICATION,
  });

  const role = await assignRole(user._id, userType);
  const verificationToken = await createEmailVerification(user._id);

  const emailResult = await sendVerificationEmail({
    to: user.email,
    firstName: user.firstName,
    token: verificationToken,
  });

  await createAuditLog({
    userId: user._id,
    action: "register",
    resourceId: user._id,
    reqMeta,
  });

  return {
    user: sanitizeUser(user, [
      { name: role.name, displayName: role.displayName },
    ]),
    message:
      "Account created. Please check your email to verify your account before signing in.",
    ...(env.nodeEnv === "development" && !emailResult.sent
      ? { devVerifyUrl: emailResult.verifyUrl }
      : {}),
  };
}

export async function login({ email, password }, reqMeta) {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
    deletedAt: null,
  }).select("+passwordHash");

  if (!user) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  if (user.isLocked) {
    throw new AppError(
      "Account is temporarily locked due to too many failed login attempts. Try again later.",
      423,
      "ACCOUNT_LOCKED",
    );
  }

  if (user.status === USER_STATUS.BLOCKED) {
    throw new AppError("Account has been blocked", 403, "ACCOUNT_BLOCKED");
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw new AppError("Account has been suspended", 403, "ACCOUNT_SUSPENDED");
  }

  if (user.status === USER_STATUS.INACTIVE) {
    throw new AppError("Account is inactive", 403, "ACCOUNT_INACTIVE");
  }

  if (!user.emailVerified || user.status === USER_STATUS.PENDING_VERIFICATION) {
    throw new AppError(
      "Please verify your email before signing in",
      403,
      "EMAIL_NOT_VERIFIED",
    );
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    await recordFailedLogin(user, normalizedEmail, "invalid_password", reqMeta);
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  user.lastLogin = new Date();
  await user.save();

  const { accessToken, refreshToken } = await createAuthSession(user, reqMeta);
  const roles = await getUserRoles(user._id);

  await LoginHistory.create({
    user: user._id,
    email: normalizedEmail,
    ipAddress: reqMeta.ipAddress,
    userAgent: reqMeta.userAgent,
    status: LOGIN_STATUS.SUCCESS,
  });

  await createAuditLog({
    userId: user._id,
    action: "login",
    resourceId: user._id,
    reqMeta,
  });

  return {
    user: sanitizeUser(user, roles),
    accessToken,
    refreshToken,
  };
}

export async function logout(refreshToken, reqMeta) {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400, "MISSING_REFRESH_TOKEN");
  }

  const tokenHash = hashToken(refreshToken);
  const storedToken = await RefreshToken.findOne({ tokenHash }).select(
    "+tokenHash",
  );

  if (storedToken && !storedToken.revokedAt) {
    storedToken.revokedAt = new Date();
    await storedToken.save();

    if (storedToken.device) {
      await Session.updateMany(
        { user: storedToken.user, device: storedToken.device, isActive: true },
        { isActive: false },
      );
    }

    await createAuditLog({
      userId: storedToken.user,
      action: "logout",
      resourceId: storedToken.user,
      reqMeta,
    });
  }
}

export async function refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401, "MISSING_REFRESH_TOKEN");
  }

  const tokenHash = hashToken(refreshToken);
  const storedToken = await RefreshToken.findOne({
    tokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  }).select("+tokenHash");

  if (!storedToken) {
    throw new AppError("Invalid or expired refresh token", 401, "INVALID_REFRESH_TOKEN");
  }

  const user = await User.findOne({
    _id: storedToken.user,
    deletedAt: null,
    status: USER_STATUS.ACTIVE,
    emailVerified: true,
  });

  if (!user) {
    throw new AppError("User account is not active", 403, "ACCOUNT_INACTIVE");
  }

  storedToken.revokedAt = new Date();
  await storedToken.save();

  const newRefreshToken = generateOpaqueToken();
  const refreshExpiresAt = addDuration(new Date(), env.jwt.refreshExpires);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(newRefreshToken),
    device: storedToken.device,
    expiresAt: refreshExpiresAt,
  });

  const activeSession = await Session.findOne({
    user: user._id,
    device: storedToken.device,
    isActive: true,
  });

  if (activeSession) {
    activeSession.lastActivity = new Date();
    activeSession.expiresAt = refreshExpiresAt;
    await activeSession.save();
  }

  const accessToken = signAccessToken(user._id, activeSession?._id);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: sanitizeUser(user, await getUserRoles(user._id)),
  };
}

export async function verifyEmail(token) {
  if (!token) {
    throw new AppError("Verification token is required", 400, "MISSING_TOKEN");
  }

  const verification = await EmailVerification.findOne({
    token,
    isVerified: false,
    expiresAt: { $gt: new Date() },
  }).select("+token");

  if (!verification) {
    throw new AppError(
      "Invalid or expired verification token",
      400,
      "INVALID_VERIFICATION_TOKEN",
    );
  }

  const user = await User.findById(verification.user);

  if (!user || user.deletedAt) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  verification.isVerified = true;
  verification.verifiedAt = new Date();
  await verification.save();

  user.emailVerified = true;
  user.status = USER_STATUS.ACTIVE;
  await user.save();

  return {
    message: "Email verified successfully. You can now sign in.",
    user: sanitizeUser(user, await getUserRoles(user._id)),
  };
}

export async function resendVerificationEmail(email) {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({
    email: normalizedEmail,
    deletedAt: null,
  });

  if (!user) {
    return {
      message:
        "If an account exists with this email, a verification link has been sent.",
    };
  }

  if (user.emailVerified) {
    throw new AppError("Email is already verified", 400, "EMAIL_ALREADY_VERIFIED");
  }

  const verificationToken = await createEmailVerification(user._id);

  await sendVerificationEmail({
    to: user.email,
    firstName: user.firstName,
    token: verificationToken,
  });

  return {
    message:
      "If an account exists with this email, a verification link has been sent.",
  };
}

export async function getCurrentUser(userId) {
  const user = await User.findOne({ _id: userId, deletedAt: null });

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  const roles = await getUserRoles(user._id);
  return sanitizeUser(user, roles);
}
