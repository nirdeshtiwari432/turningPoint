const { User } = require("../models/index");
const fs = require("fs");
const path = require("path");
const passport = require("passport");

// Async wrapper
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// =========================
// User Signup
// =========================
exports.new = asyncHandler(async (req, res) => {
  try {
    // Destructure fields from flat payload
    
    const { name, email, number, membershipType, plan, shift, password } = req.body;

    // Validate required fields
    if (!name || !number || !membershipType || !plan || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ number });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or number already exists",
      });
    }
    
    // Create new User instance (without password)
    const newUser = new User({
      name,
      email,
      number,
      membershipType,
      plan,
      shift,
    });

    // Register user with passport-local-mongoose (handles password hashing)
    const createdUser = await User.register(newUser, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});


// =========================
// User Login
// =========================
exports.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("user-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || "Invalid username or password",
      });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      
      // ✅ If login successful, send response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        redirect: "/user/profile", // frontend can redirect here
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


exports.userProfile = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const user = await User.findById(req.user._id).select(
    "-hash -salt -__v" // exclude sensitive fields
  );

  res.status(200).json({
    success: true,
    user,
  });
});
// =========================
// User Logout
// =========================
exports.userLogout = (req, res, next) => {
  console.log(req)
  req.logout(err => {
    if (err) return next(err);
    res.json({ success: true, message: "Logged out successfully" });
  });
};


exports.check = (req,res)=>{
  if (req.isAuthenticated && req.isAuthenticated()) {
    // User is logged in
    res.json({ loggedIn: true, userId: req.user._id, name: req.user.name });
  } else {
    // User not logged in
    res.json({ loggedIn: false });
  }
}

// =========================
// Profile Picture Update
// =========================
exports.updateProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an image!" });
  }

  const user = req.user;

  // Delete old profile picture
  if (user.profilePic && user.profilePic !== "/default-avatar.png") {
    const oldPath = path.join(__dirname, "../public", user.profilePic);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  // Save new profile picture
  user.profilePic = "/uploads/" + req.file.filename;
  await user.save();

  res.status(200).json({ success: true, message: "Profile picture updated!", profilePic: user.profilePic });
});
