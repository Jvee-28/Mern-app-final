import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req,res,next) => {
  try {
    const { email, password, name, consentShareAnonymized } = req.body;
    if(!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: 'Email in use' });
    const user = new User({ email, name, consentShareAnonymized });
    await user.setPassword(password);
    await user.save();
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch(err){ next(err); }
});

router.post('/login', async (req,res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await user.verifyPassword(password);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch(err){ next(err); }
});

export default router;
