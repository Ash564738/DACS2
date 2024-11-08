const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax'
};
exports.signUp = async (req, res) => {
  console.log("In SignUp Function");
  try {
    const { name, userName, about, profilePic, gender, dob, password } = req.body;
    const isExist = await User.findOne({ userName });
    console.log(isExist);
    if (isExist) {
      return res.status(400).json({ error: 'User already exists. Please try with another username.' });
    } else {
      console.log("Creating a new user");
      let updatedPass = await bcrypt.hash(password, 10);
      const user = new User({ name, userName, about, profilePic, gender, dob, password: updatedPass });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', success: "yes", data: user });
    }
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.signIn = async (req, res) => {
  console.log("In SignIn Function");
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key");
      res.cookie('token', token, cookieOptions);
      res.json({ message: 'User signed in successfully', success: "true", token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.logOut = async (req, res) => {
  console.log("In LogOut Function");
  try {
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ message: 'Logged out successfully', success: "yes" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: 'Server error' });
  }
};