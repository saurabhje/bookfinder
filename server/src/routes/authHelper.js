import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import User from '../models/userModel.js';

configDotenv();

const protect = async (req, res, next) => {
    try{
        const token = req.cookies.token
        if (!token) { res.status(401).json({success: false, message: "Not authorized"})}
        
        const id = jwt.verify(token, process.env.JWT_SECRET).id;
        req.user = await User.findById(id).select('-password');
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
        return next()
    }catch(error){
        res.status(401).json({success: false, message: "Not authorized: " + error.message})
    }
}
export default protect;