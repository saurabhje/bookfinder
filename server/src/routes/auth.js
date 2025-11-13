import express from 'express';
import User from '../models/userModel.js';
import { configDotenv } from 'dotenv';
import jasonwebtoken from 'jsonwebtoken';
import protect from './authHelper.js';
import {OAuth2Client } from 'google-auth-library';

configDotenv();

const auth = express.Router();
const jwt = jasonwebtoken;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        }
        )
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

auth.post('/signup', async (req, res) => {
    const { username, name, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        const newUser = new User({ username, name, password });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created',
            user: newUser
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error creating user: ' + err.message
        });
    }
});
auth.post('/glogin', async (req, res) => {
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.G_CLIENT,
        });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    const username = email.split("@")[0]
    let user = await User.findOne({ username: username });
    if (!user) {
            user = new User({
                username: username,
                name: name || username,
                password: Math.random().toString(36).slice(-8)
            });
            await user.save();
        }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        });

        res.status(200).json({
            success: true,
            message: 'Google login successful',
            user
        });

})


auth.get('/profile', protect, async(req, res) => {
    res.status(200).json({success: true, user: req.user});
});

export default auth;