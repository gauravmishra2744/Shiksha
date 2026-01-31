import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update streak
    const today = new Date().setHours(0, 0, 0, 0);
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate).setHours(0, 0, 0, 0) : null;
    
    if (lastLogin) {
      const daysDiff = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
      if (daysDiff === 1) {
        user.streak += 1;
        user.xp += 10; // Bonus XP for maintaining streak
      } else if (daysDiff > 1) {
        user.streak = 1;
      }
    } else {
      user.streak = 1;
    }
    
    user.lastLoginDate = new Date();
    await user.save();

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      grade: user.grade,
      stream: user.stream,
      xp: user.xp,
      level: user.level,
      coins: user.coins,
      streak: user.streak
    };

    return NextResponse.json({
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error during login' },
      { status: 500 }
    );
  }
}
