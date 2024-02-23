const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null, unique: true },
  password: { type: String, default: null },
});

const User = mongoose.model("User", userSchema);

module.exports = User;