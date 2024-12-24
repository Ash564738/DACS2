const History = require('../Modals/history');

// Thêm video vào lịch sử
exports.addHistory = async (req, res) => {
  const { videoId, title, thumbnail, views, duration } = req.body;
  const userId = req.user.userId;

  try {
    const existingHistory = await History.findOne({ video: videoId, user: userId });
    if (existingHistory) {
      return res.status(200).json({ message: 'Video already in history' });
    }

    const newHistory = new History({
      video: videoId,
      user: userId,
      title,
      thumbnail,
      views,
      duration,
    });
    await newHistory.save();
    res.status(201).json({ message: 'Video added to history' });
  } catch (error) {
    console.error('Error adding video to history:', error);
    res.status(500).json({ message: 'Failed to add video to history', error });
  }
};

// Get the list of watched videos
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await History.find({ user: userId })
      .populate({
        path: 'video',
        populate: {
          path: 'user',
          model: 'user'
        }
      });
    res.status(200).json({ history });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history', error });
  }
};

// Delete a history entry
exports.deleteHistory = async (req, res) => {
  try {
    const historyId = req.params.id;
    await History.findByIdAndDelete(historyId);
    res.status(200).json({ message: 'History entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting history entry:', error);
    res.status(500).json({ message: 'Failed to delete history entry', error });
  }
};