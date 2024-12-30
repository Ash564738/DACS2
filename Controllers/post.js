const Post = require('../Modals/post');
const User = require('../Modals/user');

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
        const posts = await Post.find().populate('user').populate({
                path: 'comments.user',
                model: 'user'
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'Success', posts });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        res.status(500).json({ message: 'Error fetching posts' });
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

// Like or unlike a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.user.userId;
        if (post.like.includes(userId)) {
            // If user already liked the post, remove the like
            post.like = post.like.filter(id => id.toString() !== userId);
        } else {
            // Otherwise, add the like
            post.like.push(userId);
        }

        await post.save();
        res.status(200).json({ message: 'Post updated', post });
    } catch (error) {
        console.error('Error in likePost:', error);
        res.status(500).json({ message: 'Error liking post' });
    }
};