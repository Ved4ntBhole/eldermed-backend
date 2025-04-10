const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 👤 Register User
const registerUser = async (req, res) => {
  try {
    const { name, phone, role } = req.body;

    const user = new User({ name, phone, role });
    await user.save();

    res.status(201).json({ message: 'User registered ✅', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed ❌' });
  }
};

// 🔐 Login User
const loginUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found 😕' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login successful 🎉', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed ❌' });
  }
};

// 👩‍⚕️ Link User to Caretaker
const linkUserToCaretaker = async (req, res) => {
  try {
    const caretakerId = req.user.userId; // logged-in caretaker
    const userIdToLink = req.params.id;

    const caretaker = await User.findById(caretakerId);
    if (caretaker.role !== 'caretaker') {
      return res.status(403).json({ error: 'Only caretakers can link to users.' });
    }

    if (!caretaker.caretakerFor.includes(userIdToLink)) {
      caretaker.caretakerFor.push(userIdToLink);
      await caretaker.save();
    }

    res.json({ message: 'User linked to caretaker 👩‍⚕️➡️👵' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong linking the user.' });
  }
};

// ✅ Export all
module.exports = {
  registerUser,
  loginUser,
  linkUserToCaretaker,
};
