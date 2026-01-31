import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: String,
  files: [String],
  submittedAt: {
    type: Date,
    default: Date.now
  },
  grade: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: String,
  status: {
    type: String,
    enum: ['submitted', 'graded', 'late'],
    default: 'submitted'
  }
});

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an assignment title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 100
  },
  attachments: [String],
  submissions: [SubmissionSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

export default mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);
