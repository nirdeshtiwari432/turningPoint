const mongoose = require("../db");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  number: { type: Number, required: true },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: "AvailableSeat", required: true },
  membershipType: { type: String, enum: ["reserved", "non_reserved"], required: true },
  plan: { type: String, enum: ["full_time", "part_time"], required: true },
  shift: { type: String, enum: ["morning", "night", "full"], default: "full" },
  fees: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  feeStatus: { type: Boolean, default: false, required: true },
  profilePic: {
  type: String,          
  default:  "/default-avatar.png" 
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
