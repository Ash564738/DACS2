const Video = require('../Modals/video');
exports.uploadVideo = async (req, res) => {
    console.log("uploadVideo");
    try {
        const { title, description, videoLink, videoType, thumbnail } = req.body;
        const videoUpload = new Video({ user: req.user._id, title, description, videoLink, videoType, thumbnail });
        await videoUpload.save();
        res.status(201).json({ success: true, videoUpload });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllVideo = async (req, res) => {
    console.log("getAllVideo");
    try {
        const videos = await Video.find().populate('user', 'name profilePic').select('title thumbnail duration views');
        res.status(201).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getVideoById = async (req, res) => {
    console.log("getVideoById");
    try {
        const { id } = req.params;
        const video = await Video.findById(id).populate('user', 'name profilePic');
        res.status(201).json({ success: true, video });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllVideoByUserID = async (req, res) => {
    console.log("getAllVideoByUserID");
    try {
        const { userId } = req.params;
        const videos = await Video.find({ user: userId }).populate('user', 'name profilePic userName createdAt about');
        res.status(201).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.toggleLikeDislike = async (req, res) => {
    const { id: videoId } = req.params;
    const userId = req.user._id;
    const { action } = req.query; 
    console.log(`toggleLikeDislike on video controller - Video ID: ${videoId}, User ID: ${userId}, Action: ${action}`);
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            console.log("Video not found for ID:", videoId);
            return res.status(404).json({ error: 'Video not found' });
        }
        if (!Array.isArray(video.like)) video.like = [];
        if (!Array.isArray(video.dislike)) video.dislike = [];
        if (action === "like") {
            if (video.like.includes(userId)) {
                video.like.pull(userId);
            } else {
                video.like.push(userId);
                video.dislike.pull(userId);
            }
        } else if (action === "dislike") {
            if (video.dislike.includes(userId)) {
                video.dislike.pull(userId);
            } else {
                video.dislike.push(userId);
                video.like.pull(userId);
            }
        } else {
            return res.status(400).json({ error: "Invalid action" });
        }
        await video.save();
        res.status(201).json({ like: video.like.length, dislike: video.dislike.length });
    } catch (error) {
        console.error("Error in toggleLikeDislike:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.incrementViews = async (req, res) => {
    console.log("incrementViews");
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        res.status(200).json({ success: true, views: video.views });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};