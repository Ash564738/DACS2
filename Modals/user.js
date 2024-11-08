const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  }
}, { timestamps: true });
module.exports = mongoose.model('user', userSchema);