import mongoose from "mongoose";
import env from "../env.config";

const dbURI: string = env.MONGODB_ATLAS || "mongodb://127.0.0.1:27017/iot";

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected.");
  } catch (error) {
    console.log(error.message);
    throw new Error("Database connection fail while starting ...");
  }
};

export default dbConnection;
