const Comment = require('../Modals/comment');
exports.addComment = async(req,res)=>{
    console.log("In Add Comment");
    try{
        let { video, message } = req.body;
        const comment = new Comment({user: req.user._id,video,message});
        await comment.save();
        res.status(200).json({ message: 'Comment added successfully', comment });
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getCommentByVideoId = async(req,res)=>{
    console.log("In Get Comment By Video Id");
    try{
        let {videoId} = req.params;
        const comments = await Comment.find({ video: videoId }).populate('user','name profilePic userName createdAt about');
        res.status(200).json({ message: 'Success', comments});
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}