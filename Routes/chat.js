const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../Controllers/chat.js');

// Route to send a message
router.post('/sendMessage', sendMessage);
// Route to get all messages between two users
router.get('/getMessages/:userId1/:userId2', getMessages);

module.exports = router;