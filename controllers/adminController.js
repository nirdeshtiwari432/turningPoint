const { User, AvailableSeat } = require("../models/index");
const passport = require("passport");

// Helper wrapper for async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// =========================
// Admin Authentication
// =========================

exports.adminLogin = asyncHandler(async (req, res, next) => {
  passport.authenticate("admin-local", { session: true }, (err, admin, info) => {
    if (err) return next(err);

    if (!admin) {
      return res.status(400).json({ success: false, message: info?.message || "Login failed" });
    }

    req.login(admin, (err) => {
      if (err) return next(err);

      console.log(req.body); // ✅ will now print
      return res.json({ success: true, message: "Welcome Admin", admin });
    });
  })(req, res, next);
});
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
  try {
    const { member, pass } = req.body;
    const newUser = new User(member);

    const createdUser = await User.register(newUser, pass.password);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});
exports.getAllMembers = asyncHandler(async (req, res) => {
  const members = await User.find({}).populate("seat");
  console.log(members)
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


exports.unpaid = asyncHandler(async(req,res)=>{
  try {
    const users = await User.find({ feeStatus: false }).sort({ startDate: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})


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

//Montholy collection
exports.getMonthlyCollection = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Find users who paid within this month
    const users = await User.find({
      feeStatus: true,
      endDate: { $gte: startOfMonth, $lte: endOfMonth },
    }).select("name membershipType plan fees endDate");

    // Calculate total fees
    const totalAmount = users.reduce((sum, user) => sum + user.fees, 0);

    res.status(200).json({
      month: now.toLocaleString("default", { month: "long" }),
      year: now.getFullYear(),
      totalAmount,
      users,
    });
  } catch (error) {
    console.error("Error fetching monthly collection:", error);
    res.status(500).json({ message: "Server Error" });
  }
};