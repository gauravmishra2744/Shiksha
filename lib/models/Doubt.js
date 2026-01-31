import mongoose from 'mongoose';

const ResponseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isTeacher: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DoubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a doubt title'],
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  images: [String],
  responses: [ResponseSchema],
  status: {
    type: String,
    enum: ['open', 'answered', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  views: {
    type: Number,
    default: 0
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Doubt || mongoose.model('Doubt', DoubtSchema);
