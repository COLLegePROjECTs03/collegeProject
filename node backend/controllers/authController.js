// /controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Projects = require('../models/Projects')
const crypto = require('crypto');

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, password ,emailId} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      emailId:emailId
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Use the JWT secret from process.env.JWT_SECRET or fallback to a default
    const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token ,message:'Logged in succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Project
exports.projects = async (req, res) => {
    try {
      const { name, phone ,description , emailId ,techStack} = req.body;
      const newUser = new Projects({
        name,
        phone: phone,
        description:description,
        emailId:emailId,
        techStack:techStack
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error creating project' });
    }
  };

