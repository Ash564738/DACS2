const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user');
router.post("/signUp",UserController.signUp)
router.post('/signIn',UserController.signIn);
router.post('/logOut',UserController.logOut);
router.post('/toggleSubscription/:subscribeToId',UserController.toggleSubscription);
router.get('/getSubscriptions',UserController.getSubscriptions);
router.get('/getVideosByUserId/:id',UserController.getVideosByUserId);
router.get('/getUserById/:id',UserController.getUserById);
module.exports = router;