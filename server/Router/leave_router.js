const express = require("express");
const router = express.Router();
const LeaveController = require("../Controller/leave_controller");
const userMiddleware = require("../Middleware/user_middlewarw");

router.route("/applyleave").post(userMiddleware, LeaveController.applyLeave);
router.route("/getbyuser").get(userMiddleware, LeaveController.getAll);
router.route("/update/:id").put(userMiddleware, LeaveController.leaveUpdate);
router.route("/getbyadmin").get(userMiddleware, LeaveController.adminLeave);
router
  .route("/delete/:id")
  .delete(userMiddleware, LeaveController.deleteLeaves);

module.exports = router;
