import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a note title'],
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  tags: [String],
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isShared: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for search
NoteSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
