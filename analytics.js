import express from 'express';
import auth from '../middleware/auth.js';
import JournalEntry from '../models/JournalEntry.js';
const router = express.Router();

router.get('/sdg3', auth, async (req,res,next) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const { start, end } = req.query;
    const startDate = start ? new Date(start) : new Date(Date.now() - 1000*60*60*24*30);
    const endDate = end ? new Date(end) : new Date();
    const pipeline = [
      { $match: { isPrivate: false, createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, count: { $sum: 1 }, avgMood: { $avg: '$moodScore' } } },
      { $project: { _id: 0, entriesCount: '$count', avgMoodScore: '$avgMood' } }
    ];
    const result = await JournalEntry.aggregate(pipeline);
    const symptomAgg = await JournalEntry.aggregate([
      { $match: { isPrivate: false, createdAt: { $gte: startDate, $lte: endDate } } },
      { $unwind: '$symptoms' },
      { $group: { _id: '$symptoms', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    const k=5;
    const filteredSymptoms = symptomAgg.filter(s=>s.count>=k).map(s=>({ symptom: s._id, count: s.count }));
    res.json({ snapshot: result[0] || { entriesCount:0, avgMoodScore:null }, topSymptoms: filteredSymptoms });
  } catch(err){ next(err); }
});

export default router;
