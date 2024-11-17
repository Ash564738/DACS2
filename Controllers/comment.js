const Comment = require('../Modals/comment');

exports.getCommentById = async (req, res) => {
    console.log("In Get Comment By Comment ID Function");
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Comment ID is required" });
        }
        const comment = await Comment.findById(id).populate('user').populate('replies.user');
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

exports.getRepliesByCommentId = async (req, res) => {
    console.log("In Get Replies By Comment ID Function");
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Comment ID is required" });
        }
        const comment = await Comment.findById(id).populate('replies.user');
        if (!comment) {
            console.log("Comment not found for ID:", id);
            return res.status(404).json({ error: "Comment not found" });
        }
        console.log("Replies found:", comment.replies);
        res.status(200).json({ message: 'Success', replies: comment.replies });
    } catch (error) {
        console.error("Error in getRepliesByCommentId:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addComment = async (req, res) => {
    console.log("In Add Comment Function");
    try {
        let { video, message } = req.body;
        const comment = new Comment({ user: req.user.userId, video, message, like: [], dislike: [] }); 
        await comment.save();
        const populatedComment = await Comment.findById(comment._id).populate('user').populate('replies.user');
        res.status(201).json({ message: 'Success', comment: populatedComment });
    } catch (error) {
        console.error("Error in addComment:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addReply = async (req, res) => {
    console.log("In Add Reply Function");
    try {
        let { commentId } = req.params;
        let { message } = req.body;
        console.log("Comment ID:", commentId);
        const comment = await Comment.findById(commentId).populate('user').populate('replies.user');
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        const reply = { user: req.user.userId, message, like: [], dislike: [] };
        comment.replies.push(reply);
        await comment.save();
        await comment.populate('replies.user');
        const newReply = comment.replies[comment.replies.length - 1];
        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error("Error in addReply:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCommentByVideoId = async (req, res) => {
    console.log("In Get Comment By Video Id Function");
    try {
        let { videoId } = req.params;
        const comments = await Comment.find({ video: videoId })
            .populate('user')
            .populate({
                path: 'replies',
                populate: { path: 'user' }
            });
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
            console.log("Comment not found for ID:", commentId);
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
        } else {
            console.log("Invalid action:", action);
            return res.status(400).json({ error: "Invalid action" });
        }
        await comment.save();
        res.status(200).json({ like: comment.like, dislike: comment.dislike });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in toggleCommentLikeDislike:", error);
    }
};

exports.toggleReplyLikeDislike = async (req, res) => {
    console.log("In toggleReplyLikeDislike Function");
    const { commentId, replyId } = req.params;
    const userId = req.user.userId;
    const { action } = req.query;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        const reply = comment.replies.id(replyId);
        if (!reply) {
            console.log("Reply not found for ID:", replyId);
            return res.status(404).json({ error: "Reply not found" });
        }
        if (!Array.isArray(reply.like)) reply.like = [];
        if (!Array.isArray(reply.dislike)) reply.dislike = [];
        if (action === "like") {
            if (reply.like.includes(userId)) {
                reply.like.pull(userId);
                console.log("User removed from likes:", userId);
            } else {
                reply.like.push(userId);
                reply.dislike.pull(userId);
                console.log("User removed from dislikes:", userId);
            }
        } else if (action === "dislike") {
            if (reply.dislike.includes(userId)) {
                reply.dislike.pull(userId);
                console.log("User removed from dislikes:", userId);
            } else {
                reply.dislike.push(userId);
                reply.like.pull(userId);
                console.log("User added to dislikes and removed from likes:", userId);
            }
        } else {
            console.log("Invalid action:", action);
            return res.status(400).json({ error: "Invalid action" });
        }
        await comment.save();
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in toggleReplyLikeDislike:", error);
    }
};

exports.deleteComment = async (req, res) => {
    console.log("In deleteComment Function");
    const { id: commentId } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in deleteComment:", error);
    }
};

exports.deleteReply = async (req, res) => {
    console.log("In deleteReply Function");
    const { commentId, replyId } = req.params;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        const reply = comment.replies.id(replyId);
        if (!reply) {
            console.log("Reply not found for ID:", replyId);
            return res.status(404).json({ error: "Reply not found" });
        }
        comment.replies.pull(replyId);
        await comment.save();
        res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error("Error in deleteReply:", error);
    }
};

exports.editComment = async (req, res) => {
    console.log("In editComment Function");
    const { id: commentId } = req.params;
    const { message } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        comment.message = message;
        await comment.save();
        res.status(200).json({ message: 'Comment edited successfully', comment });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in editComment:", error);
    }
};

exports.editReply = async (req, res) => {
    console.log("In editReply Function");
    const { commentId, replyId } = req.params;
    const { message } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            console.log("Comment not found for ID:", commentId);
            return res.status(404).json({ error: "Comment not found" });
        }
        const reply = comment.replies.id(replyId);
        if (!reply) {
            console.log("Reply not found for ID:", replyId);
            return res.status(404).json({ error: "Reply not found" });
        }
        reply.message = message;
        await comment.save();
        res.status(200).json({ message: 'Reply edited successfully', reply });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in editReply:", error);
    }
};