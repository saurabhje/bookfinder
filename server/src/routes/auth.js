import express from 'express';
import User from '../models/userModel.js';
const auth = express.Router();

auth.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

auth.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error creating user: ' + err.message
        });
    }
});

auth.get('/profile', (req, res) => {
    res.send('Profile route'); // Added temporary response
});

export default auth;