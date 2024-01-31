const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/Leave_Management";

const connectDB = async () => {
  try {
    console.log("database connection successful");
    mongoose.connect(URI);
  } catch (error) {
    console.log("database connection failed");
    process.exit();
  }
};

module.exports = connectDB;
