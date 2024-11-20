const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post');
const auth = require('../middleware/authentication');

// Route to create a new post
router.post('/createPost', postController.createPost);
// Route to get all posts
router.get('/getAllPosts', postController.getAllPosts);;
// Route to add a comment to a post
router.post('/:id/comments', auth, postController.addCommentToPost);
// Route to like a post
router.post('/:id/like', auth, postController.likePost);

module.exports = router;
