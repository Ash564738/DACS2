const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/comment');
const auth = require('../middleware/authentication');
router.get('/getCommentById/:id',CommentController.getCommentById);
router.post('/comment',auth,CommentController.addComment);
router.get('/getCommentByVideoId/:videoId',CommentController.getCommentByVideoId);
router.put('/toggleCommentLikeDislike/:id',auth,CommentController.toggleCommentLikeDislike);
module.exports = router;