const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  categories: {
    type: String,
    required: [true, "Enter your password"],
  },

  status: {
    type: Boolean,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("records", userRecordSchema);