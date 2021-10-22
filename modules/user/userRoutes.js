const express = require("express");
const router = express.Router();
const userControllers = require("./userController");

router.post("/auth", userControllers.auth);

module.exports = router;
