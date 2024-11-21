const express = require('express');
const router = express.Router();
const postController = require('../Controllers/post');
const auth = require('../middleware/authentication');
<<<<<<< HEAD

=======
>>>>>>> d220ad6971b31171f3e30efb4fcfbb14c1355e4e
// Route to create a new post
router.post('/createPost', postController.createPost);
// Route to get all posts
router.get('/getAllPosts', postController.getAllPosts);;
// Route to add a comment to a post
router.post('/:id/comments', auth, postController.addCommentToPost);
<<<<<<< HEAD
// Route to like a post
router.post('/:id/like', auth, postController.likePost);
=======
router.put('/:id', postController.toggleLikeDislike);
router.put('/:postId/comments/:commentId/like', postController.likeComment);
router.put('/:postId/comments/:commentId/dislike', postController.dislikeComment);
>>>>>>> d220ad6971b31171f3e30efb4fcfbb14c1355e4e

module.exports = router;
