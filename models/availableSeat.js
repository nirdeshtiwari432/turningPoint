const mongoose = require("../db");

const availableSeatSchema = new mongoose.Schema({
  seatNo: { type: Number, required: true, unique: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  timing: { type: String, enum: ["full_time", "morning", "night"], default: "full_time" }
});

module.exports = mongoose.model("AvailableSeat", availableSeatSchema);
