const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notes: [],
  tags: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserData", UserDataSchema);
