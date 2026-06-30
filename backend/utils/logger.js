class Logger {
  constructor() {
    this.isProd = process.env.NODE_ENV === "production";
  }

  info(message, meta = {}) {
    console.log(`[INFO] ${message}`, meta);
  }

  warn(message, meta = {}) {
    console.warn(`[WARN] ${message}`, meta);
  }

  error(message, meta = {}) {
    console.error(`[ERROR] ${message}`, meta);
  }

  debug(message, meta = {}) {
    if (!this.isProd) {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  }
}

export default new Logger();
