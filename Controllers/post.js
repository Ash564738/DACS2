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
    console.log("In Get All Posts Function");
    try {
        const posts = await Post.find().populate('user', 'name profilePic userName createdAt about').sort({ createdAt: -1 });
        console.log("Posts retrieved:", posts);
        res.status(200).json({ message: 'Success', posts });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
// Like a post
exports.likePost = async (req, res) => {
    console.log("In Like Post Function");
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.like.push(req.user._id);  // Add user ID to likes array
        await post.save();
        console.log("Post liked:", post);

        res.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        console.error("Error in likePost:", error);
        res.status(500).json({ message: 'Error liking post' });
    }
};
// Add a comment to a post
exports.addCommentToPost = async (req, res) => {
    console.log("In Add Comment To Post Function");
    const postId = req.params.id;
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.comments.push({ user: req.user._id, content: req.body.content });
        await post.save();
        console.log("Comment added:", post);

        res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
        console.error("Error in addCommentToPost:", error);
        res.status(500).json({ message: 'Error adding comment' });
    }
};


