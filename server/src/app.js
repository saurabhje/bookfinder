import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import auth from './routes/auth.js';

dotenv.config();

const uri = process.env.MONGOURI;
const app = express();
app.use(cors());
app.use(express.json());

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