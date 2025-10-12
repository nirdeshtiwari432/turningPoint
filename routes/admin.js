const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
let is = (req,res,next)=>{
  console.log("test");
  next()
}

// Import controller
const adminController = require("../controllers/adminController");

// =========================
// Admin Authentication
// =========================
router.route("/login").post(is,adminController.adminLogin,is);
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

router.route("/unpaid-users")
      .get(isAdmin,adminController.unpaid)

// =========================
// Seat Management
// =========================
router.route("/seats").get(isAdmin, adminController.getSeats);

// =========================
// Monthly Collection
// =========================
router.route("/monthly-collection").get(isAdmin, adminController.getMonthlyCollection);

router.route("/fees")
   .get(adminController.fees)

//varify
router.route("/varify/:id")
  .post(is,adminController.varify)

router.delete("/delete/:id", adminController.deleteBankDetail);


router.get("/plans", adminController.getPlans);
router.post("/plans/addPlan", adminController.addPlan);
router.put("/plans/:id", adminController.updatePlan);
router.delete("/plans/:id", adminController.deletePlan);


module.exports = router;
