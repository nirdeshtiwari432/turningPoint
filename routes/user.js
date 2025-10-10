const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");

// Middleware example
let is = (req, res, next) => {
  console.log("Middleware test");
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
  .get(is,userController.userLogout);

// =========================
// User Profile
// =========================
router.get("/profile", userController.userProfile);

router.route("/profile-pic")
  .post(upload.single("profilePic"), userController.updateProfilePic);

// =========================
router.route("/check-login")
   .get(userController.check);

// Fees & Review (JSON APIs for SPA)
router.route("/fees")
  .get((req, res) => res.json({ success: true, message: "Fees page API coming soon" }));

router.route("/review")
  .get((req, res) => res.json({ success: true, message: "Review page API coming soon" }));

module.exports = router;
