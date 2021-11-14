const express = require("express");

const router = express.Router();

const userRoutes = require("./modules/user/userRoutes");
const homeFeedRoutes = require("./modules/homefeed/homeFeedRoutes");

router.use("/user", userRoutes);
router.use("/home", homeFeedRoutes);

module.exports = router;
