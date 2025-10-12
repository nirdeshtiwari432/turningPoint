require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB Atlas");
}

connectDB().catch((err) => console.error("❌ MongoDB Error:", err));
module.exports = mongoose;
