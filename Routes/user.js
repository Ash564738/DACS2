const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user');
const auth = require('../middleware/authentication');
router.post("/signUp",UserController.signUp)
router.post('/signIn',UserController.signIn);
router.post('/logOut',UserController.logOut);
router.post('/toggleSubscription/:subscribeToId',auth, UserController.toggleSubscription);
router.get('/getSubscriptions',auth, UserController.getSubscriptions);
router.get('/getVideosByUserId/:id',UserController.getVideosByUserId);
router.get('/getUserById/:id',auth, UserController.getUserById);
router.get('/getAllUsers', UserController.getAllUsers);
module.exports = router;