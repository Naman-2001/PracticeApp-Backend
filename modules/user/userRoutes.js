const express = require("express");
const router = express.Router();
const userControllers = require("./userController");

router.get("/auth", userControllers.auth);

module.exports = router;
