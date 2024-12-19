const Notification = require('../Modals/notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.userId })
            .sort({ date: -1 })
            .populate({
                path: 'user',
                select: 'profilePic'
            })
            .populate({
                path: 'video',
                select: 'thumbnail'
            });

        res.status(200).json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: 'Server error' });
    }
};