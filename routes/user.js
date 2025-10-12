const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/uploadProfile");
const userController = require("../controllers/userController");
const {isUser} = require("../middleware/auth");



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
  .get(isUser,userController.userLogout);

// =========================
// User Profile
// =========================
router.get("/profile",isUser, userController.userProfile);

router.route("/upload-photo")
  .post(isUser,upload.single("profilePic"),userController.updateProfilePic);

// =========================
router.route("/check-login")
   .get(userController.check);

// Fees & Review (JSON APIs for SPA)
router.route("/bank-details")
  .post(isUser,userController.bank);

router.route("/review")
  .get((req, res) => res.json({ success: true, message: "Review page API coming soon" }));

  

module.exports = router;
