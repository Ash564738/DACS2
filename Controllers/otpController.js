const crypto = require('crypto');
const transporter = require('../Configuration/emailConfig');

let userOtpMap = {};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log(`Received request to send OTP to email: ${email}`);

  const otp = crypto.randomInt(100000, 999999);
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  userOtpMap[email] = { otp, expiresAt };
  console.log(`Generated OTP: ${otp} for email: ${email}, expires at: ${new Date(expiresAt).toISOString()}`);

  try {
    await transporter.sendMail({
      from: '"App Support" <your-email@gmail.com>',
      to: email,
      subject: 'OTP Verification Code',
      text: `Your OTP code is ${otp}, valid for 5 minutes.`,
    });
    console.log(`OTP sent successfully to email: ${email}`);
    res.json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error(`Failed to send OTP to email: ${email}`, err);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
};

exports.verifyOtp = (req, res) => {
  const { otp } = req.body;
  const email = req.body.email.trim(); // Sanitize email before using it as a key
  console.log(`Received request to verify OTP for email: ${email}, OTP: ${otp}`);

  const storedOtp = userOtpMap[email];
  if (!storedOtp) {
    console.error(`No OTP found for email: ${email}`);
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }

  console.log(`Stored OTP: ${storedOtp.otp}, Received OTP: ${otp}`);
  console.log(`Current Time: ${Date.now()}, Expires At: ${storedOtp.expiresAt}`);

  if (storedOtp.otp.toString() !== otp.toString() || Date.now() > storedOtp.expiresAt) {
    console.error(`Invalid or expired OTP for email: ${email}`);
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }

  delete userOtpMap[email];
  console.log(`OTP verified successfully for email: ${email}`);
  res.json({ message: 'OTP verified successfully.' });
};