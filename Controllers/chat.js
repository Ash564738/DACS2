const Message = require('../Modals/chat');

// Send a new message
exports.sendMessage = async (req, res) => {
  console.log("In sendMessage");
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Error sending message', error });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  console.log("In getMessages");
  try {
    const { userId1, userId2 } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Error fetching messages', error });
  }
};