import dotenv from "dotenv";
const path = require("path");

//dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
  PORT: process.env.PORT ?? "",
  MONGODB_ATLAS: process.env.MONGODB_ATLAS ?? "",
};
