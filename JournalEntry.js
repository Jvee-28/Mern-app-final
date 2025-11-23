import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  title: { type: String },
  body: { type: String, required: true },
  mood: { type: String, enum: ['very-negative','negative','neutral','positive','very-positive'], default: 'neutral' },
  moodScore: { type: Number, min:0, max:10 },
  symptoms: [{ type: String }],
  interventions: [{ type: String }],
  isPrivate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('JournalEntry', JournalEntrySchema);
