const { User, AvailableSeat } = require("../models/index");
const passport = require("passport");

// Helper wrapper for async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// =========================
// Admin Authentication
// =========================

exports.adminLogin = [
  passport.authenticate("admin-local"),
  asyncHandler(async (req, res) => {
    res.json({ success: true, message: "Welcome Admin", admin: req.user });
  })
];

exports.adminDashboard = asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Admin Dashboard Accessed" });
});

exports.adminLogout = (req, res, next) => {
  try {
    req.logout(err => {
      if (err) return next(err);
      res.json({ success: true, message: "You are logged out" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// =========================
// User Management
// =========================

exports.addMember = asyncHandler(async (req, res) => {
  const { member, pass } = req.body;
  const addUser = new User(member);
  const newUser = await User.register(addUser, pass.password);
  res.json({ success: true, message: "User registered", user: newUser });
});

exports.getAllMembers = asyncHandler(async (req, res) => {
  const members = await User.find({}).populate("seat");
  res.json(members);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("seat");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, message: "User updated", user: updatedUser });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, message: "User deleted" });
});

// =========================
// Seat Management
// =========================

exports.getSeats = asyncHandler(async (req, res) => {
  const filter = req.query.filter;
  let query = {};

  if (filter === "booked") query.isBooked = true;
  else if (filter === "notBooked") query.isBooked = false;
  else if (filter === "registered") query.bookedBy = { $ne: null };
  else if (filter === "notRegistered") query.bookedBy = null;

  const seats = await AvailableSeat.find(query).populate("bookedBy");
  res.json({ seats, filter });
});
