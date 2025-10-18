const { User, BankDetails } = require("../models/index");
const passport = require("passport");

// Async wrapper to catch errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// =========================
// User Signup
// =========================
exports.new = asyncHandler(async (req, res) => {
  const { name, email, number, membershipType, plan, shift, password } = req.body;

  if (!name || !number || !membershipType || !plan || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const existingUser = await User.findOne({ number });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User with this number already exists" });
  }

  const newUser = new User({ name, email, number, membershipType, plan, shift });
  const createdUser = await User.register(newUser, password);

  req.login(createdUser, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Login after signup failed" });
    }

    res.status(201).json({ success: true, message: "User registered successfully", user: createdUser });
  });
});

// =========================
// User Login
// =========================
exports.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("user-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ success: false, message: info?.message || "Invalid username or password" });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      res.status(200).json({
        success: true,
        message: "Login successful",
        redirect: "/user/profile",
        user: {
          _id: user._id,
          name: user.name,
          number: user.number,
          membershipType: user.membershipType,
          plan: user.plan,
          shift: user.shift,
        },
      });
    });
  })(req, res, next);
});

// =========================
// User Profile
// =========================
exports.userProfile = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const user = await User.findById(req.user._id).select("-hash -salt -__v").populate("seat");
  res.status(200).json({ success: true, user });
});

// =========================
// User Logout
// =========================
exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true, message: "Logged out successfully" });
  });
};

// =========================
// Check Login Status
// =========================
exports.check = (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ loggedIn: true, userId: req.user._id, name: req.user.name });
  } else {
    res.json({ loggedIn: false });
  }
};

// =========================
// Profile Picture Update
// =========================
exports.updateProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an image!" });
  }

  const user = req.user;

  // Delete old Cloudinary photo if not default
  if (user.profilePic && !user.profilePic.includes("default-avatar")) {
    try {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_photos/${publicId}`);
    } catch (err) {
      // silently fail if deletion fails
    }
  }

  user.profilePic = req.file.path;
  await user.save();

  res.json({ success: true, message: "Profile picture updated successfully!", imageUrl: req.file.path });
});

// =========================
// Submit Bank Details
// =========================
exports.bank = asyncHandler(async (req, res) => {
  const { accountHolder, upiMobile, plan, amount } = req.body;

  if (!accountHolder || !upiMobile || !plan || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const bankDetails = new BankDetails({
    user: req.user._id,
    accountHolder,
    upiMobile,
    plan,
    amount,
  });

  await bankDetails.save();

  res.json({ success: true, message: "Bank details submitted successfully!" });
});
