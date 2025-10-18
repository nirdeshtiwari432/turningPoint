const { User, AvailableSeat, BankDetails, Plan ,Alert} = require("../models/index");
const passport = require("passport");
require("dotenv").config();

// Helper wrapper for async errors
const asyncHandler = (fn) => (req, res, next) => {
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
      return res.json({ success: true, message: "Welcome Admin", admin });
    });
  })(req, res, next);
});

exports.adminDashboard = asyncHandler(async (req, res) => {
  res.json({ success: true, message: "Admin Dashboard Accessed" });
});

exports.adminLogout = (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ success: true, message: "You are logged out" });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// =========================
// User Management
// =========================
exports.addMember = asyncHandler(async (req, res) => {
  const { member, pass } = req.body;
  const newUser = new User(member);
  const createdUser = await User.register(newUser, pass.password);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: createdUser,
  });
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
  const { seatNo, ...updates } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  // Handle seat update if seatNo provided
  if (seatNo) {
    const seat = await AvailableSeat.findOne({ seatNo });
    if (!seat) return res.status(404).json({ success: false, message: "Seat not found" });

    if (seat.isBooked && (!seat.bookedBy || seat.bookedBy.toString() !== id)) {
      return res.status(400).json({ success: false, message: "Seat already booked" });
    }

    // Free old seat if different
    if (user.seat && user.seat.toString() !== seat._id.toString()) {
      await AvailableSeat.findByIdAndUpdate(user.seat, { isBooked: false, bookedBy: null });
    }

    // Assign new seat
    seat.isBooked = true;
    seat.bookedBy = id;
    await seat.save();

    updates.seat = seat._id;
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json({ success: true, message: "User updated successfully", user: updatedUser });
});


exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find user
  const user = await User.findById(id).populate("seat");
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  // 1️⃣ Free up their seat
  if (user.seat?._id) {
    await AvailableSeat.findByIdAndUpdate(user.seat._id, {
      isBooked: false,
      bookedBy: null,
    });
  }

  // 2️⃣ Delete profile photo from Cloudinary (if exists)
  if (user.profilePic && !user.profilePic.includes("default-avatar.png")) {
    try {
      // Extract public_id from Cloudinary URL
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile/${publicId}`);
    } catch (err) {
      console.error("Cloudinary delete error:", err.message);
    }
  }

  // 3️⃣ Delete related BankDetails
  await BankDetails.deleteMany({ user: user._id });

  // 4️⃣ Delete the user
  await User.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "User deleted successfully (profile photo + seat freed)",
  });
});


exports.unpaid = asyncHandler(async (req, res) => {
  const users = await User.find({ feeStatus: false }).sort({ startDate: -1 });
  res.json(users);
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

// =========================
// Monthly Collection
// =========================
exports.getMonthlyCollection = asyncHandler(async (req, res) => {
  console.log("month")
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const users = await User.find({
    feeStatus: true,
    endDate: { $gte: startOfMonth},
  }).select("name membershipType plan fees endDate");

  const totalAmount = users.reduce((sum, user) => sum + user.fees, 0);

  res.status(200).json({
    month: now.toLocaleString("default", { month: "long" }),
    year: now.getFullYear(),
    totalAmount,
    users,
  });
});

// =========================
// Bank Details
// =========================
exports.fees = asyncHandler(async (req, res) => {
  const bank = await BankDetails.find({});
  res.json(bank);
});

exports.varify = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bankDetail = await BankDetails.findById(id);
  if (!bankDetail) return res.status(404).json({ message: "Bank detail not found" });

  bankDetail.verified = true;
  await bankDetail.save();

  const user = await User.findById(bankDetail.user);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.feeStatus = true;
  await user.save();

  res.status(200).json({ message: "Verification successful", bankDetail, user });
});

exports.deleteBankDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bankDetail = await BankDetails.findByIdAndDelete(id);
  if (!bankDetail) return res.status(404).json({ message: "Bank detail not found" });
  res.status(200).json({ message: "Bank detail deleted successfully" });
});

// =========================
// Plans Management
// =========================
exports.getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();
  res.json({ success: true, plans });
});

exports.addPlan = asyncHandler(async (req, res) => {
  const plan = await Plan.create(req.body);
  res.status(201).json({ success: true, plan });
});

exports.updatePlan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedPlan = await Plan.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedPlan) return res.status(404).json({ success: false, message: "Plan not found" });
  res.json({ success: true, updatedPlan });
});

exports.deletePlan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Plan.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ success: false, message: "Plan not found" });
  res.json({ success: true, message: "Plan deleted successfully" });
});



// ✅ Get all alerts
exports.getAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 });
  res.json({ success: true, alerts });
});

// ✅ Add a new alert
exports.addAlert = asyncHandler(async (req, res) => {
  const { title,description } = req.body;
  
  const alert = await Alert.create({ title,description });
  
  res.status(201).json({ success: true, alert });
});

// ✅ Update alert
exports.updateAlert = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedAlert = await Alert.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedAlert)
    return res.status(404).json({ success: false, message: "Alert not found" });
  res.json({ success: true, updatedAlert });
});

// ✅ Delete alert
exports.deleteAlert = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Alert.findByIdAndDelete(id);
  if (!deleted)
    return res.status(404).json({ success: false, message: "Alert not found" });
  res.json({ success: true, message: "Alert deleted successfully" });
});
