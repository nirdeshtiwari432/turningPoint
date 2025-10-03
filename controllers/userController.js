const { User } = require("../models/index");
const fs = require("fs");
const path = require("path");

// Async wrapper
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// =========================
// User Authentication
// =========================

exports.renderLogin = (req, res) => {
  res.render("user/login.ejs");
};

exports.userLogin = asyncHandler(async (req, res) => {
  const user = req.user;
  req.flash("success", "Welcome User");
  console.log(user);
  res.render("user/user.ejs", { user });
});

exports.userLogout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/user/login");
  });
};

// =========================
// User Profile
// =========================

exports.renderProfile = (req, res) => {
  res.render("user/profile.ejs", { user: req.user });
};

exports.updateProfilePic = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload an image!");
      return res.render("user/user.ejs", { user: req.user });
    }

    const user = req.user;

    // Delete old profile picture
    if (user.profilePic) {
      const oldPath = path.join(__dirname, "../public", user.profilePic);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Save new profile picture
    user.profilePic = "/uploads/" + req.file.filename;
    await user.save();

    req.flash("success", "Profile picture updated!");
    res.render("user/user.ejs", { user });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.render("user/user.ejs", { user: req.user });
  }
});

// =========================
// User Pages
// =========================

exports.renderFees = (req, res) => {
  res.render("user/fees.ejs", { user: req.user });
};

exports.renderReview = (req, res) => {
  res.render("review.ejs", { user: req.user });
};
