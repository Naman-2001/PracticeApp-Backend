const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    email: { type: String },
    providers: [
      {
        name: { type: String },
        id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
