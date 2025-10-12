// middleware/auth.js
const { User, Admin } = require("../models");

// Check if user is logged in
const isUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user instanceof User) {
    return next();
  }
  return res.status(401).json({ success: false, message: "User not authenticated" });
};

// Check if admin is logged in
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user instanceof Admin) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Admin not authenticated" });
};

// Optional: check either user or admin
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Not authenticated" });
};

module.exports = {
  isUser,
  isAdmin,
  isAuthenticated,
};
