import { DEVICE_TYPE } from "../constants/auth.js";

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || null;
}

export function parseUserAgent(userAgent = "") {
  const ua = userAgent.toLowerCase();

  let deviceType = DEVICE_TYPE.OTHER;
  if (/mobile|android|iphone/.test(ua)) {
    deviceType = DEVICE_TYPE.MOBILE;
  } else if (/tablet|ipad/.test(ua)) {
    deviceType = DEVICE_TYPE.TABLET;
  } else if (/windows|macintosh|linux/.test(ua)) {
    deviceType = DEVICE_TYPE.DESKTOP;
  }

  let browser = "Unknown";
  if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("safari")) browser = "Safari";

  let operatingSystem = "Unknown";
  if (ua.includes("windows")) operatingSystem = "Windows";
  else if (ua.includes("mac os")) operatingSystem = "macOS";
  else if (ua.includes("android")) operatingSystem = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) operatingSystem = "iOS";
  else if (ua.includes("linux")) operatingSystem = "Linux";

  return {
    deviceType,
    browser,
    operatingSystem,
    deviceName: `${browser} on ${operatingSystem}`,
  };
}

export function getRequestMeta(req) {
  const userAgent = req.headers["user-agent"] || "";
  return {
    ipAddress: getClientIp(req),
    userAgent,
    ...parseUserAgent(userAgent),
  };
}
