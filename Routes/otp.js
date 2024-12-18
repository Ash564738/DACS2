const express = require('express');
const { sendOtp, verifyOtp } = require('../Controllers/otpController');

const router = express.Router();

router.post('/sendOTP', sendOtp);
router.post('/verifyOTP', verifyOtp);

module.exports = router;