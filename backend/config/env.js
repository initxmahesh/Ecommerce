import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
  },
};

export default env;