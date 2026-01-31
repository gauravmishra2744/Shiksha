import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a classroom name'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedule: {
    type: String,
    default: 'Not Scheduled'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Archived'],
    default: 'Active'
  },
  classCode: {
    type: String,
    unique: true,
    default: function() {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
  },
  nextClass: {
    type: String,
    default: 'Not Scheduled'
  },
  announcements: [{
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
  }],
  resources: [{
    title: String,
    type: { type: String, enum: ['pdf', 'video', 'link', 'document'] },
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.models.Classroom || mongoose.model('Classroom', ClassroomSchema);
