const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String },
  dateEnd: { type: Date },
  dateCreated: { type: Date },
  timeStart: { type: Date },
  timeEnd: { type: Date },
  priority: { type: String },
});

module.exports = mongoose.model("Todo", todoSchema);
