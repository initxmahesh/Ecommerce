import connectDB from "../config/database.js";
import logger from "../utils/logger.js";
import { runSeeds } from "../seeds/index.js";

const seed = async () => {
  try {
    await connectDB();

    const result = await runSeeds();

    logger.info("Database seeded successfully", result);
    process.exit(0);
  } catch (error) {
    logger.error("Database seed failed", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

seed();
