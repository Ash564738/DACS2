const mongoose = require('mongoose');
const Post = require('../Modals/post');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { user, content, image, video } = req.body;
        const newPostData = { user, content };

        if (image) newPostData.image = image;
        if (video) newPostData.video = video;

        const newPost = new Post(newPostData);
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user')
            .populate({
                path: 'comments.user',
                model: 'User'
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'Success', posts });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Like or dislike a post
exports.toggleLikeDislike = async (req, res) => {
    const { id: postId } = req.params;
    const userId = req.user._id; // Assuming you have middleware that sets req.user

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const alreadyLiked = post.like.includes(userId);
        const alreadyDisliked = post.dislike.includes(userId);

        if (req.query.action === "like") {
            if (alreadyLiked) {
                post.like.pull(userId); // Remove like
            } else {
                post.like.push(userId); // Add like
                post.dislike.pull(userId); // Remove from dislikes if present
            }
        } else if (req.query.action === "dislike") {
            if (alreadyDisliked) {
                post.dislike.pull(userId); // Remove dislike
            } else {
                post.dislike.push(userId); // Add dislike
                post.like.pull(userId); // Remove from likes if present
            }
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await post.save();
        res.status(200).json({ post });
    } catch (error) {
        console.error("Error in toggleLikeDislike:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a comment to a post
exports.addCommentToPost = async (req, res) => {
    console.log("In addCommentToPost");
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log("Post not found");
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = {
            user: req.user.userId,
            content: req.body.content
        };
        post.comments.push(newComment);
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        console.error("Error in addCommentToPost:", error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};

// Like a comment
exports.likeComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.like.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already liked this comment' });
        }

        comment.like.push(req.user._id);
        await post.save();

        res.status(200).json({ message: 'Comment liked successfully', post });
    } catch (error) {
        console.error("Error in likeComment:", error);
        res.status(500).json({ message: 'Error liking comment' });
    }
};

// Dislike a comment
exports.dislikeComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.dislike.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already disliked this comment' });
        }

        comment.dislike.push(req.user._id);
        await post.save();

        res.status(200).json({ message: 'Comment disliked successfully', post });
    } catch (error) {
        console.error("Error in dislikeComment:", error);
        res.status(500).json({ message: 'Error disliking comment' });
    }
};