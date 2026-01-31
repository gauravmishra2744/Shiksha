import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password, role, grade } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      grade: grade || '10th Grade',
      xp: 0,
      level: 1,
      coins: 0,
      streak: 0,
      lastLoginDate: new Date()
    });

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
      xp: user.xp,
      level: user.level,
      coins: user.coins,
      streak: user.streak
    };

    return NextResponse.json({
      success: true,
      token,
      user: userData
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Server error during registration' },
      { status: 500 }
    );
  }
}
