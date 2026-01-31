import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthUser } from '@/lib/auth';

// Get teacher's courses
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const courses = await Course.find({ instructor: user.userId })
      .populate('enrolledStudents', 'name avatar')
      .lean();

    return NextResponse.json(courses);

  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// Create a new course
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    const course = await Course.create({
      ...data,
      instructor: user.userId,
      enrolledStudents: [],
      isPublished: false
    });

    return NextResponse.json(course, { status: 201 });

  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
