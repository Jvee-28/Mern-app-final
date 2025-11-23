import express from 'express';
import auth from '../middleware/auth.js';
import JournalEntry from '../models/JournalEntry.js';
const router = express.Router();

router.post('/', auth, async (req,res,next) => {
  try {
    const payload = { ...req.body, user: req.user._id };
    const entry = await JournalEntry.create(payload);
    res.status(201).json(entry);
  } catch(err){ next(err); }
});

router.get('/', auth, async (req,res,next) => {
  try {
    const { limit=20, page=1 } = req.query;
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
    res.json(entries);
  } catch(err){ next(err); }
});

router.get('/:id', auth, async (req,res,next) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id, user: req.user._id });
    if(!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch(err){ next(err); }
});

router.put('/:id', auth, async (req,res,next) => {
  try {
    const entry = await JournalEntry.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if(!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch(err){ next(err); }
});

router.delete('/:id', auth, async (req,res,next) => {
  try {
    await JournalEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(204).send();
  } catch(err){ next(err); }
});

export default router;
