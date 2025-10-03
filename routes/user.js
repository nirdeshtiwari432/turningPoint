const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/upload");
const userController = require("../controllers/userController");

// =========================
// User Authentication
// =========================
router.route("/login")
  .get(userController.renderLogin)
  .post(
    passport.authenticate('user-local', { failureRedirect: "/user/login", failureFlash: true }),
    userController.userLogin
  );

router.route("/logout").get(userController.userLogout);

// =========================
// User Profile
// =========================
router.route("/profile").get(userController.renderProfile);

router.route("/profile-pic").post(upload.single("profilePic"), userController.updateProfilePic);

// =========================
// Fees & Review
// =========================
router.route("/fees").get(userController.renderFees);
router.route("/review").get(userController.renderReview);

module.exports = router;
