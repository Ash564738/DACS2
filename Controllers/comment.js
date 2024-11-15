const Comment = require('../Modals/comment');
exports.getCommentById = async (req, res) => {
    console.log("In Get Comment By Comment ID Function");
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Comment ID is required" });
        }
        const comment = await Comment.findById(id).populate('user', 'name profilePic userName createdAt about').select('video message like dislike createdAt');
        if (!comment) {
            console.log("Comment not found for ID:", id);
            return res.status(404).json({ error: "Comment not found" });
        }
        console.log("Comment found:", comment);
        res.status(200).json({ message: 'Success', comment });
    } catch (error) {
        console.error("Error in getCommentById:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.addComment = async (req, res) => {
    console.log("In Add Comment Function");
    try {
        let { video, message } = req.body;
        // console.log("Received data:", { video, message });
        const comment = new Comment({ user: req.user.userId, video, message }); 
        await comment.save();
        // console.log("Comment saved:", comment);
        const populatedComment = await Comment.findById(comment._id).populate('user', 'name profilePic userName createdAt about');
        // console.log("Populated comment:", populatedComment);
        res.status(201).json({ message: 'Success', comment: populatedComment });
    } catch (error) {
        console.error("Error in addComment:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getCommentByVideoId = async (req, res) => {
    console.log("In Get Comment By Video Id Function");
    try {
        let { videoId } = req.params;
        // console.log("Received videoId:", videoId);
        const comments = await Comment.find({ video: videoId }).populate('user', 'name profilePic userName createdAt about');
        // console.log("Comments found:", comments);
        res.status(200).json({ message: 'Success', comments });
    } catch (error) {
        console.error("Error in getCommentByVideoId:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.toggleCommentLikeDislike = async (req, res) => {
    console.log("In toggleCommentLikeDislike Function");
    const { id: commentId } = req.params;
    const userId = req.user.userId;
    const { action } = req.query;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", videoId);
            return res.status(404).json({ error: "Comment not found" });
        }
        if (!Array.isArray(comment.like)) comment.like = [];
        if (!Array.isArray(comment.dislike)) comment.dislike = [];
        if (action === "like") {
            if (comment.like.includes(userId)) {
                comment.like.pull(userId);
                console.log("User removed from likes:", userId);
            } else {
                comment.like.push(userId);
                comment.dislike.pull(userId);
                console.log("User removed from dislikes:", userId);
            }
        } else if (action === "dislike") {
            if (comment.dislike.includes(userId)) {
                comment.dislike.pull(userId);
                console.log("User removed from dislikes:", userId);
            } else {
                comment.dislike.push(userId);
                comment.like.pull(userId);
                console.log("User added to dislikes and removed from likes:", userId);
            }
        } else{
            console.log("Invalid action:", action);
            return res.status(400).json({ error: "Invalid action" });
        }
        await comment.save();
        res.status(200).json({ comment });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
