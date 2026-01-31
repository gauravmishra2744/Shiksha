import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PomodoroSession from '@/lib/models/PomodoroSession';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get pomodoro sessions
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const sessions = await PomodoroSession.find({ user: user.userId })
      .sort({ startedAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json(sessions);

  } catch (error) {
    console.error('Pomodoro sessions fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pomodoro sessions' },
      { status: 500 }
    );
  }
}

// Create/complete a pomodoro session
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { subject, duration, completed } = await request.json();

    const xpEarned = completed ? Math.floor(duration / 5) : 0; // 1 XP per 5 minutes

    const session = await PomodoroSession.create({
      user: user.userId,
      subject,
      duration,
      completed: completed || false,
      startedAt: new Date(),
      completedAt: completed ? new Date() : null,
      xpEarned
    });

    if (completed && xpEarned > 0) {
      await User.findByIdAndUpdate(user.userId, {
        $inc: { xp: xpEarned, coins: Math.floor(xpEarned / 10) }
      });
    }

    return NextResponse.json(session, { status: 201 });

  } catch (error) {
    console.error('Pomodoro session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create pomodoro session' },
      { status: 500 }
    );
  }
}
