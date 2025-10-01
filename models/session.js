const mongoose = require("../db");

const sessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, expires: "2h" }
});

module.exports = mongoose.model("Session", sessionSchema);
