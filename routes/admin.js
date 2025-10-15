const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");
const adminController = require("../controllers/adminController");
const updateExpiredFees = require("../middleware/updateFeeStatus")
let is = (req,res,next)=>{
  console.log(1)
  next()
}

// Admin Login
router.post("/login", adminController.adminLogin); // removed stray `,is`

// Admin Dashboard (protected)
router.get("/dashboard", isAdmin, adminController.adminDashboard);

// Logout (protected)
router.get("/logout", isAdmin, adminController.adminLogout);

// User Management
router.post("/new", isAdmin, adminController.addMember);
router.get("/members", isAdmin, adminController.getAllMembers);

router
  .route("/users/:id")
  .get(isAdmin, adminController.getUserById)
  .put(isAdmin, adminController.updateUser)
  .delete(isAdmin, adminController.deleteUser);

router.get("/unpaid-users", isAdmin,updateExpiredFees,is, adminController.unpaid);

// Seat Management
router.get("/seats", isAdmin, adminController.getSeats);

// Monthly Collection & Fees
router.get("/monthly-collection",isAdmin, adminController.getMonthlyCollection);
router.get("/fees", isAdmin, adminController.fees);

// Bank Verification
router.post("/varify/:id", isAdmin, adminController.varify);
router.delete("/delete/:id", isAdmin, adminController.deleteBankDetail);

// Plan Management
router.get("/plans",  adminController.getPlans);
router.post("/plans/addPlan", isAdmin, adminController.addPlan);
router.put("/plans/:id", isAdmin, adminController.updatePlan);
router.delete("/plans/:id", isAdmin, adminController.deletePlan);

module.exports = router;
