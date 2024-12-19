const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'video', required: true },
    message: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Add thumbnail field
    profilePic: { type: String, required: true }, // Add profilePic field
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('notification', notificationSchema);