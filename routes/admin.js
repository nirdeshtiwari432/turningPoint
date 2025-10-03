const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");

// Import controller
const adminController = require("../controllers/adminController");

// =========================
// Admin Authentication
// =========================
router.route("/login").post(adminController.adminLogin);
router.route("/dashboard").get(isAdmin, adminController.adminDashboard);
router.route("/logout").get(adminController.adminLogout);

// =========================
// User Management
// =========================
router.route("/new").post(isAdmin, adminController.addMember);
router.route("/members").get(isAdmin, adminController.getAllMembers);

router
  .route("/users/:id")
  .get(isAdmin, adminController.getUserById)
  .put(isAdmin, adminController.updateUser)
  .delete(isAdmin, adminController.deleteUser);

// =========================
// Seat Management
// =========================
router.route("/seats").get(isAdmin, adminController.getSeats);

module.exports = router;
