import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB connected successfully`, {
      host: connection.connection.host,
      name: connection.connection.name,
    });
  } catch (error) {
    logger.error(`MongoDB connection failed`, {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

export default connectDB;
