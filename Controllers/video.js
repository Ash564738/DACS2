const Notification = require('../Modals/notification');
const User = require('../Modals/user');
const Video = require('../Modals/video');
const ffmpeg = require('fluent-ffmpeg');

exports.uploadVideo = async (req, res) => {
    console.log("In uploadVideo Function");
    try {
        const { title, description, videoLink, videoType, thumbnail } = req.body;
        console.log("Received data:", { title, description, videoLink, videoType, thumbnail });
        let duration;
        await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(videoLink, (err, metadata) => {
                if (err) return reject(err);
                duration = metadata.format.duration;
                resolve();
            });
        });
        const formattedDuration = new Date(duration * 1000).toISOString().substr(11, 8);
        const videoUpload = new Video({ user: req.user.userId, title, description, videoLink, videoType, thumbnail, duration: formattedDuration });
        await videoUpload.save();
        console.log("Video uploaded successfully:", videoUpload);
        const user = await User.findById(req.user.userId).populate('subscriptions');
        const notifications = user.subscriptions.map(subscriber => ({
            user: subscriber._id,
            video: videoUpload._id,
            message: `${user.name} uploaded a new video: ${title}`,
            thumbnail: videoUpload.thumbnail,
            profilePic: user.profilePic
        }));
        await Notification.insertMany(notifications);
        res.status(201).json({ success: true, videoUpload });
    } catch (error) {
        console.error("Error in uploadVideo:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllVideo = async (req, res) => {
    console.log("In getAllVideo Function");
    try {
        const videos = await Video.find().populate('user');
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error("Error in getAllVideo:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getVideoById = async (req, res) => {
    console.log("In getVideoById Function");
    try {
        const { id } = req.params;
        const video = await Video.findById(id).populate('user');
        if (!video) {
            console.log("Video not found for ID:", id);
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json({ success: true, video });
    } catch (error) {
        console.error("Error in getVideoById:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllVideoByUserID = async (req, res) => {
    console.log("In getAllVideoByUserID Function");
    try {
        const { userId } = req.params;
        const videos = await Video.find({ user: userId }).populate('user');
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error("Error in getAllVideoByUserID:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllVideoByName = async (req, res) => {
    console.log("In getAllVideoByName Function");
    try {
        const { title } = req.params;
        const videos = await Video.find({ title: { $regex: title, $options: 'i' } }).populate('user');
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error("Error in getAllVideoByName:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.toggleLikeDislike = async (req, res) => {
    console.log("In toggleLikeDislike Function");
    const { id: videoId } = req.params;
    const userId = req.user.userId;
    const { action } = req.query;
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
            console.log("Invalid action:", action);
            return res.status(400).json({ error: "Invalid action" });
        }
        await video.save();
        res.status(200).json({ like: video.like.length, dislike: video.dislike.length });
    } catch (error) {
        console.error("Error in toggleLikeDislike:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.incrementViews = async (req, res) => {
    console.log("In incrementViews Function");
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json({ success: true, views: video.views });
    } catch (error) {
        console.error("Error in incrementViews:", error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getLikedVideos = async (req, res) => {
    console.log("In getLikedVideos Function");
    try {
      const userId = req.params.userId;
        if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const likedVideos = await Video.find({ like: userId }).populate('user');
      if (!likedVideos || likedVideos.length === 0) {
        return res.status(404).json({ message: 'No liked videos found.' });
    }
      res.status(200).json({ likedVideos });
    } catch (error) {
      console.error("Error in getLikedVideos:", error);
      res.status(500).json({ error: 'Server error' });
    }
};