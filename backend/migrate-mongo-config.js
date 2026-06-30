import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const getDatabaseName = (uri) => {
  if (process.env.MONGO_DB_NAME) return process.env.MONGO_DB_NAME;

  const match = uri.match(/\/([^/?]+)(\?|$)/);
  return match?.[1] || "test";
};

const config = {
  mongodb: {
    url: mongoUri,
    databaseName: getDatabaseName(mongoUri),
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 900,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: "esm",
};

export default config;
