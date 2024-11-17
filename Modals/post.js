const mongoose = require('mongoose');
const commentPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    content: String,
    like: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] 
    }],
    dislike: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] 
    }]
}, { timestamps: true });
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: String,
    image: String,
    video: String,
    like: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] 
    }],
    dislike: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] 
    }],
    comments: [commentPostSchema]
}, { timestamps: true });
module.exports = mongoose.model('post', postSchema);
