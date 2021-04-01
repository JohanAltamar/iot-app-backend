import dotenv from "dotenv";

//dotenv configuration
dotenv.config();

export default {
  PORT: process.env.PORT ?? "",
  MONGODB_ATLAS: process.env.MONGODB_ATLAS ?? "",
};
