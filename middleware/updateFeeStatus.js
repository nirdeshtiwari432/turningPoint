const User = require("../models/user");

async function updateExpiredFees(req, res, next) {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // include full day till midnight

    // 🔹 1. Set feeStatus = false for users whose endDate <= today
    const expiredUsers = await User.find({
      endDate: { $lte: today },
      feeStatus: true,
    });

    if (expiredUsers.length > 0) {
      await User.updateMany(
        { _id: { $in: expiredUsers.map((u) => u._id) } },
        { $set: { feeStatus: false } }
      );
      console.log(
        `[Middleware] ${expiredUsers.length} user(s) expired → feeStatus set to false.`
      );
    }

    // 🔹 2. Set feeStatus = true for users whose endDate > today
    const activeUsers = await User.find({
      endDate: { $gt: today },
      feeStatus: false,
    });

    if (activeUsers.length > 0) {
      await User.updateMany(
        { _id: { $in: activeUsers.map((u) => u._id) } },
        { $set: { feeStatus: true } }
      );
      console.log(
        `[Middleware] ${activeUsers.length} user(s) active → feeStatus set to true.`
      );
    }

    next();
  } catch (err) {
    console.error("[Middleware Error] Updating feeStatus failed:", err);
    next(err);
  }
}

module.exports = updateExpiredFees;
