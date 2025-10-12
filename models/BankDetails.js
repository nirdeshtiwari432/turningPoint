const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountHolder: { type: String, required: true },
    upiMobile: { type: String, required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    verified: { type: Boolean, default: false }, // Admin verification status
    submittedAt: { type: Date, default: Date.now },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankDetails", bankDetailsSchema);
