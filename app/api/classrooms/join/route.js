import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Classroom from '@/lib/models/Classroom';
import { getAuthUser } from '@/lib/auth';

// Join classroom with code (students)
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'student') {
      return NextResponse.json({ error: 'Only students can join classrooms' }, { status: 403 });
    }

    await connectDB();

    const { classCode } = await request.json();

    const classroom = await Classroom.findOne({ classCode: classCode.toUpperCase() });
    if (!classroom) {
      return NextResponse.json({ error: 'Invalid class code' }, { status: 404 });
    }

    if (classroom.students.includes(user.userId)) {
      return NextResponse.json({ error: 'Already joined this classroom' }, { status: 400 });
    }

    classroom.students.push(user.userId);
    await classroom.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined classroom',
      classroom: {
        id: classroom._id,
        name: classroom.name,
        subject: classroom.subject
      }
    });

  } catch (error) {
    console.error('Classroom join error:', error);
    return NextResponse.json(
      { error: 'Failed to join classroom' },
      { status: 500 }
    );
  }
}
