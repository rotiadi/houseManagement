const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  km: {
    type: Number,
    required: true,
  },
  vin: {
    type: String,
    required: true,
    unique: true,
  },
  identification: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

const Car = mongoose.model("Car", CarSchema, "cars");

module.exports = Car;
