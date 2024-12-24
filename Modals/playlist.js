const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
    default: []
  }],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  title: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    enum: ['Public', 'Private', 'Unlisted'],
    default: 'Private'
  },
  collaborate: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('playlist', playlistSchema);