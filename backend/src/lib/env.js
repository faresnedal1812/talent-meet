// import "dotenv/config"; OR =>
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  NODE_ENV: process.env.NODE_ENV,
};
