const User = require('../Modals/user');
const Video = require('../Modals/video');
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
    console.log("Received data:", { name, userName, about, profilePic, gender, dob });
    const isExist = await User.findOne({ userName });
    console.log("User exists:", isExist);
    if (isExist) {
      return res.status(400).json({ error: 'User already exists. Please try with another username.' });
    } else {
      console.log("Creating a new user");
      let updatedPass = await bcrypt.hash(password, 10);
      const user = new User({ name, userName, about, profilePic, gender, dob, password: updatedPass });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', success: "yes", data: user });
      console.log("User registered successfully:", user);
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
    console.log("Received data:", { userName, password });
    const user = await User.findOne({ userName });
    console.log("User found:", user);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key");
      res.cookie('token', token, cookieOptions);
      res.json({ message: 'User signed in successfully', success: "true", token, user });
      console.log("User signed in successfully:", user);
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
      console.log("Invalid credentials for user:", userName);
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
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.changePassword = async (req, res) => {
  const { userName, newPassword } = req.body;
  console.log(`Received request to change password for user: ${userName}`);
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`Hashed new password for user: ${userName}`);
    const result = await User.updateOne({ userName }, { password: hashedPassword });
    if (result.nModified === 0) {
      console.error(`No user found with userName: ${userName}`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`Password updated successfully for user: ${userName}`);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(`Failed to update password for user: ${userName}`, error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};
exports.toggleSubscription = async (req, res) => {
  console.log("In toggleSubscription Function");
  try {
    const { userId } = req.user;
    const { subscribeToId } = req.params;
    const user = await User.findById(userId);
    const isSubscribed = user.subscriptions.includes(subscribeToId);
    if (isSubscribed) {
      user.subscriptions.pull(subscribeToId);
      await User.findByIdAndUpdate(subscribeToId, { $inc: { subscribers: -1 } });
    } else {
      user.subscriptions.push(subscribeToId);
      await User.findByIdAndUpdate(subscribeToId, { $inc: { subscribers: 1 } });
    }
    await user.save();
    res.json({ isSubscribed: !isSubscribed });
  } catch (error) {
    console.error("Error in toggleSubscription:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
      const { userId } = req.user;
      const user = await User.findById(userId).populate('subscriptions');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      console.log(user.subscriptions);  // Log the subscriptions field
      const subscribedUserIds = user.subscriptions.map((sub) => sub._id);
      const videos = await Video.find({ user: { $in: subscribedUserIds } }).populate('user');
      res.json({
          success: true,
          subscribedUsers: user.subscriptions,
          videos,
      });
  } catch (error) {
      console.error("Error in getSubscriptions:", error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.getVideosByUserId = async (req, res) => {
  console.log("In getVideosByUserId Function");
  try {
    const userId = req.params.id;
    const videos = await Video.find({ user: userId });
    res.json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  console.log("In getAllUsers Function");
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  console.log("In getUserById Function");
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Server error' });
  }
};