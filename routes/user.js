const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/uploadProfile");
const userController = require("../controllers/userController");

// Middleware example
let is = (req, res, next) => {
  console.log("Middleware test");
  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  next();
};

// =========================
// User Signup
// =========================
router.route("/new")
  .post(userController.new);

// =========================
// User Authentication
// =========================
router.route("/login")
  .post(userController.login)

router.route("/logout")
  .get(userController.userLogout);

// =========================
// User Profile
// =========================
router.get("/profile", userController.userProfile);

router.route("/upload-photo")
  .post(upload.single("profilePic"),is,userController.updateProfilePic);

// =========================
router.route("/check-login")
   .get(userController.check);

// Fees & Review (JSON APIs for SPA)
router.route("/bank-details")
  .post(is,isLoggedIn,userController.bank);

router.route("/review")
  .get((req, res) => res.json({ success: true, message: "Review page API coming soon" }));

  

module.exports = router;
