import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  videoUrl: String,
  duration: String,
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  }
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: '/placeholder-course.png'
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lessons: [LessonSchema],
  totalDuration: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  tags: [String],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
