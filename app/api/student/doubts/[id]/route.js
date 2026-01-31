import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Doubt from '@/lib/models/Doubt';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get doubt details
export async function GET(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const doubt = await Doubt.findById(params.id)
      .populate('student', 'name avatar')
      .populate('responses.user', 'name avatar role')
      .lean();

    if (!doubt) {
      return NextResponse.json({ error: 'Doubt not found' }, { status: 404 });
    }

    // Increment views
    await Doubt.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json(doubt);

  } catch (error) {
    console.error('Doubt details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doubt details' },
      { status: 500 }
    );
  }
}

// Add response to doubt
export async function POST(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { content } = await request.json();

    const doubt = await Doubt.findById(params.id);
    if (!doubt) {
      return NextResponse.json({ error: 'Doubt not found' }, { status: 404 });
    }

    const userData = await User.findById(user.userId);
    const isTeacher = userData.role === 'teacher';

    doubt.responses.push({
      user: user.userId,
      content,
      isTeacher,
      helpful: 0,
      createdAt: new Date()
    });

    if (isTeacher) {
      doubt.status = 'answered';
    }

    await doubt.save();

    // Award XP for answering
    await User.findByIdAndUpdate(user.userId, {
      $inc: { xp: isTeacher ? 15 : 10, coins: isTeacher ? 3 : 2 }
    });

    const updatedDoubt = await Doubt.findById(params.id)
      .populate('student', 'name avatar')
      .populate('responses.user', 'name avatar role');

    return NextResponse.json(updatedDoubt);

  } catch (error) {
    console.error('Response creation error:', error);
    return NextResponse.json(
      { error: 'Failed to add response' },
      { status: 500 }
    );
  }
}
