const { User , BankDetails } = require("../models/index");
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
    const { name, email, number, membershipType, plan, shift, password } = req.body;

    if (!name || !number || !membershipType || !plan || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or number already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      number,
      membershipType,
      plan,
      shift,
    });

    const createdUser = await User.register(newUser, password);

    // ✅ Place req.login here
    req.login(createdUser, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login after signup failed",
        });
      }

      // User is now logged in, session created
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: createdUser,
      });
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
    console.log(user)
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
  console.log("🧑 User:", req.body);
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload an image!" });
  }

  const user = req.user;

  // Delete old photo from Cloudinary (if not default)
  if (user.profilePic && !user.profilePic.includes("default-avatar")) {
    try {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profile_photos/${publicId}`);
    } catch (err) {
      console.warn("Failed to delete old Cloudinary image:", err.message);
    }
  }

  user.profilePic = req.file.path;
  await user.save();

  res.json({
    success: true,
    message: "Profile picture updated successfully!",
    imageUrl: req.file.path,
  });
});

exports.bank = asyncHandler(async(req,res)=>{
  const { accountHolder, upiMobile, plan, amount } = req.body;
  console.log(req.body,req.user._id)

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
  })



