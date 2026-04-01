const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controllers");

// ✅ CONNECT ROUTES TO CONTROLER
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;