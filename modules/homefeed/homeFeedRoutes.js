const express = require("express");
const router = express.Router();
const homeFeedController = require("./homeFeedController");

router.get("/feed", homeFeedController.feed);

module.exports = router;
