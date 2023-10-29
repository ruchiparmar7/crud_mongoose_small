const mongoose = require("mongoose");

const port = "mongodb://127.0.0.1:27017/taskdb";

const connectDB = async function () {
  try {
    const conn = await mongoose.connect(port);
    console.log("successfully connected");
    return conn.connection.host;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
