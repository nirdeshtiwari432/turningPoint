const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["seat", "longterm"], required: true },
  timing: { type: String, default: null },
  duration: { type: String, default: null },
  reserved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Plan", planSchema);
