const express = require("express");
const router = express.Router();
const userController = require("../Controller/user_controller");
const userMiddleware = require("../Middleware/user_middlewarw");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/").get(userMiddleware, userController.user);
router.route("/update/:id").put(userMiddleware, userController.update);

module.exports = router;
