const express = require("express");
const router = express.Router();
const attendanceController = require("../Controller/attendance_controller");

router.route("/checkin").post(attendanceController.checkIn);
router.route("/checkout").post(attendanceController.checkOut);
router.route("/getAll/:id").get(attendanceController.getAll);
router.route("/admin/getAll").get(attendanceController.adminAttendance);
router.route("/admin/delete/:id").delete(attendanceController.del);

module.exports = router;
