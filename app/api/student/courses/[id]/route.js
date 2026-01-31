import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthUser } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const course = await Course.findById(params.id)
      .populate('instructor', 'name avatar bio')
      .lean();

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const enrolled = course.enrolledStudents?.some(
      id => id.toString() === user.userId
    );

    return NextResponse.json({
      ...course,
      id: course._id,
      enrolled,
      enrolledCount: course.enrolledStudents?.length || 0
    });

  } catch (error) {
    console.error('Course details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course details' },
      { status: 500 }
    );
  }
}
