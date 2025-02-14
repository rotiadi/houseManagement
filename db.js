const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connecting to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Listen to connection events
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
