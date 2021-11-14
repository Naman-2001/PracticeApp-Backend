const express = require("express");
const router = express.Router();
const todoController = require("./todoController");

router.post("/todo", todoController);

module.exports = router;
