const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);