const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post');
// Route to create a new post
router.post('/createPost', postController.createPost);
// Route to get all posts
router.get('/getAllPosts', postController.getAllPosts);
// Route to like a post
router.put('/:id/like', postController.likePost);
// Route to add a comment to a post
router.post('/:id/comments', postController.addCommentToPost);
module.exports = router;
