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
        const videos = await Video.find().populate('user', 'name profilePic userName createdAt');
        res.status(200).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getVideoById = async (req, res) => {
    console.log("getVideoById");
    try {
        const { id } = req.params;
        const video = await Video.findById(id).populate('user', 'name profilePic userName createdAt about');
        res.status(200).json({ success: true, video });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllVideoByUserID = async (req, res) => {
    console.log("getAllVideoByUserID");
    try {
        const { userId } = req.params;
        const videos = await Video.find({ user: userId }).populate('user', 'name profilePic userName createdAt about');
        res.status(200).json({ success: true, videos });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.likeVideo = async (req, res) => {
    console.log("likeVideo");
    try {
        const { id: videoId } = req.params;
        const userId = req.user._id;
        const video = await Video.findById(videoId);
        if (video.like.includes(userId)) {
            video.like.pull(userId);
        } else {
            video.like.push(userId);
            video.dislike.pull(userId);
        }
        await video.save();
        res.status(200).json({ like: video.like.length, dislike: video.dislike.length });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.dislikeVideo = async (req, res) => {
    console.log("dislikeVideo");
    try {
        const { id: videoId } = req.params;
        const userId = req.user._id;
        const video = await Video.findById(videoId);
        if (video.dislike.includes(userId)) {
            video.dislike.pull(userId);
        } else {
            video.dislike.push(userId);
            video.like.pull(userId);
        }
        await video.save();
        res.status(200).json({ like: video.like.length, dislike: video.dislike.length });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};