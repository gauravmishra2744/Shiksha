import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['achievement', 'milestone', 'special'],
    default: 'achievement'
  },
  requirements: {
    type: String
  },
  xpReward: {
    type: Number,
    default: 50
  },
  coinReward: {
    type: Number,
    default: 10
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, {
  timestamps: true
});

const UserBadgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 100
  }
});

export const Badge = mongoose.models.Badge || mongoose.model('Badge', BadgeSchema);
export const UserBadge = mongoose.models.UserBadge || mongoose.model('UserBadge', UserBadgeSchema);
