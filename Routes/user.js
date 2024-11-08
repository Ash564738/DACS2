const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user');
router.post("/signUp",UserController.signUp)
router.post('/signIn',UserController.signIn);
router.post('/logOut',UserController.logOut);
module.exports = router;