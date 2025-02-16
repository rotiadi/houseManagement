const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({});
const upload = multer({ storage });

const userRoute = require("./routes/userRoute");

require("dotenv").config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formatMongoError = (error) => {
  if (error.name === "MongoServerError") {
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return {
        code: "DUPLICATE_KEY",
        message: `The value for '${field}' already exists.`,
        details: error.keyValue,
      };
    }
  } else if (error.name === "ValidationError") {
    // Mongoose validation error
    const messages = Object.values(error.errors).map((err) => err.message);
    return {
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      details: messages,
    };
  }
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express API");
});

// userRouter
app.use("/users", userRoute);

app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  const error = err;
  // TODO: Handle error
  if (err) {
    /* const formattedError = formatMongoError(err);
    if (!formattedError) {
      res.status(500).json({
        statusCode: 500,
        message: err,
      });
    } else {
      res.status(500).json(formattedError);
    } */

    res.status(500).json({
      statusCode: 500,
      message: error,
    });
  } else {
    next();
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
