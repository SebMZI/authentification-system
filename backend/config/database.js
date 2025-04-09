import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "./env.js";

export const connectToDatabase = async () => {
  try {
    if (!DB_URI) {
      console.log("Set DB_URI in .env.<developmennt|production>.local file");
      return;
    }

    await mongoose.connect(DB_URI);
    console.log(`Connected to DB in ${NODE_ENV} mode`);
  } catch (error) {
    console.log(
      `Failed to establish connection to database, please check DB_URI in .env.<developmennt|production>.local file`,
      error
    );
  }
};
