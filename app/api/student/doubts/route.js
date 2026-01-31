import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Doubt from '@/lib/models/Doubt';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get all doubts
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const subject = searchParams.get('subject');

    let query = {};
    if (status) query.status = status;
    if (subject) query.subject = subject;

    const doubts = await Doubt.find(query)
      .populate('student', 'name avatar')
      .populate('responses.user', 'name avatar')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(doubts);

  } catch (error) {
    console.error('Doubts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doubts' },
      { status: 500 }
    );
  }
}

// Create a new doubt
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { title, description, subject, classroom, priority, images } = await request.json();

    const doubt = await Doubt.create({
      title,
      description,
      subject,
      student: user.userId,
      classroom,
      priority: priority || 'medium',
      images: images || [],
      status: 'open',
      responses: [],
      views: 0,
      upvotes: 0
    });

    const populatedDoubt = await Doubt.findById(doubt._id)
      .populate('student', 'name avatar');

    // Award XP for asking a doubt
    await User.findByIdAndUpdate(user.userId, {
      $inc: { xp: 5, coins: 1 }
    });

    return NextResponse.json(populatedDoubt, { status: 201 });

  } catch (error) {
    console.error('Doubt creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create doubt' },
      { status: 500 }
    );
  }
}
