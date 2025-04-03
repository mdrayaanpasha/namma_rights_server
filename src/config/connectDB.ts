import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function ConnectToDB(): Promise<void> {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the app if DB connection fails
  }
}
