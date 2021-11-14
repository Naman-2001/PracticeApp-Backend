const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hoemFeedSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("HomeFeed", hoemFeedSchema);
