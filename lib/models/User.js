import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: 'https://github.com/shadcn.png'
  },
  grade: {
    type: String,
    default: '10th Grade'
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', null],
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  // Gamification fields
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  coins: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastLoginDate: {
    type: Date
  },
  badges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge'
  }],
  // Teacher specific fields
  subjects: [{
    type: String
  }],
  qualification: {
    type: String
  },
  experience: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add XP and update level
UserSchema.methods.addXP = function(points) {
  this.xp += points;
  // Level up every 500 XP
  this.level = Math.floor(this.xp / 500) + 1;
  return this.save();
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
