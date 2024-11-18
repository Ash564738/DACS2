const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post');
// Route to create a new post
router.post('/createPost', postController.createPost);
// Route to get all posts
router.get('/getAllPosts', postController.getAllPosts);;
// Route to add a comment to a post
router.post('/:id/comments', postController.addCommentToPost);
router.put('/:id', postController.toggleLikeDislike);
router.put('/:postId/comments/:commentId/like', postController.likeComment);
router.put('/:postId/comments/:commentId/dislike', postController.dislikeComment);

module.exports = router;
