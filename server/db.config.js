const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017/bookStore");
  console.log(`${mongoose.connection.host} is connected`);
};

module.exports = connectDB;
