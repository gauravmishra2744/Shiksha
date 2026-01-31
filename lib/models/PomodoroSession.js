import mongoose from 'mongoose';

const PomodoroSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: String,
  duration: {
    type: Number,
    required: true // in minutes
  },
  completed: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  xpEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.PomodoroSession || mongoose.model('PomodoroSession', PomodoroSessionSchema);
