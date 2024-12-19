const express = require('express');
const router = express.Router();
const NotificationController = require('../Controllers/notification');
const auth = require('../middleware/authentication');
router.get('/getNotifications', auth, NotificationController.getNotifications);
module.exports = router;