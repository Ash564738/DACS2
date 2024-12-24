const express = require('express');
const router = express.Router();
const historyController = require('../Controllers/history');
const auth = require('../middleware/authentication');

// Route để thêm video vào lịch sử
router.post('/addHistory', auth, historyController.addHistory);

// Route để lấy danh sách lịch sử
router.get('/getHistory', auth, historyController.getHistory);

// Route để xóa một mục lịch sử
router.delete('/deleteHistory/:id', auth, historyController.deleteHistory);

module.exports = router;