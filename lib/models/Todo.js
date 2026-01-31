import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: Date,
  category: {
    type: String,
    enum: ['study', 'assignment', 'exam', 'other'],
    default: 'other'
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedToModel'
  },
  relatedToModel: {
    type: String,
    enum: ['Classroom', 'Assignment', 'Course']
  }
}, {
  timestamps: true
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
