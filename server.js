import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_journal';

mongoose.connect(MONGODB_URI).then(()=>{
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server listening on', PORT));
}).catch(err=>{
  console.error('MongoDB connection error', err);
  process.exit(1);
});
