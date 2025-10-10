const mongoose = require("../db");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  number: { type: String, required: true, unique: true }, // string is better
  membershipType: { type: String, enum: ["reserved", "non_reserved"], required: true },
  plan: { type: String, enum: ["full_time", "part_time"], required: true },
  shift: { type: String, enum: ["morning", "night", "full"], default: "full" },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: "AvailableSeat", default: null },
  fees: { type: Number, default: 0 },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  feeStatus: { type: Boolean, default: false },
  profilePic: { type: String, default: "/default-avatar.png" }
});

// IMPORTANT: set usernameField to "number"
userSchema.plugin(passportLocalMongoose, { usernameField: "number" });

module.exports = mongoose.model("User", userSchema);
