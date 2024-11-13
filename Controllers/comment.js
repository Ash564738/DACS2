const Comment = require('../Modals/comment');

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