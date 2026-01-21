import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";

import auth from './routes/auth.js';

dotenv.config();
const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://bookfinder-zeta.vercel.app'];
const uri = process.env.MONGOURI;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true
}));

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', auth);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});