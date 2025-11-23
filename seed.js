import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/User.js';
import JournalEntry from '../models/JournalEntry.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_journal';

async function seed(){
  await mongoose.connect(MONGODB_URI);
  let user = await User.findOne({ email: 'pilot@example.com' });
  if(!user){
    user = new User({ email: 'pilot@example.com', name: 'Pilot', role: 'admin', consentShareAnonymized: true });
    await user.setPassword('password');
    await user.save();
  }
  const entries = [];
  for(let i=0;i<50;i++){
    entries.push({ user: user._id, body: `Seed entry ${i}`, mood: ['neutral','positive','negative'][i%3], moodScore: Math.floor(Math.random()*11), isPrivate: Math.random()>0.5?false:true, createdAt: new Date(Date.now()-i*1000*60*60*24) });
  }
  await JournalEntry.insertMany(entries);
  console.log('Seeded DB');
  process.exit(0);
}

seed();
