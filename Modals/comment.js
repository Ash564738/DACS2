const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }]
}, { timestamps: true });
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    replies: [replySchema]
}, { timestamps: true });
module.exports = mongoose.model('comment', commentSchema);