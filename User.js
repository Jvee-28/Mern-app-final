import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  consentShareAnonymized: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.setPassword = async function(password){
  this.passwordHash = await bcrypt.hash(password, 12);
};
UserSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model('User', UserSchema);
