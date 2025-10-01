const mongoose = require("../db");
const passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String, // better to use String for phone numbers
    required: true,
    unique: true
  }
});

// Configure passport-local-mongoose to use "mobile" as the username field
adminSchema.plugin(passportLocalMongoose, { usernameField: "mobile" });

module.exports = mongoose.model("Admin", adminSchema);
