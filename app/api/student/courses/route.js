import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import { getAuthUser } from '@/lib/auth';

// Get all courses
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');
    const difficulty = searchParams.get('difficulty');

    let query = { isPublished: true };
    
    if (subject) query.subject = subject;
    if (grade) query.grade = grade;
    if (difficulty) query.difficulty = difficulty;

    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .select('-lessons')
      .lean();

    const coursesWithProgress = courses.map(course => ({
      ...course,
      id: course._id,
      enrolled: course.enrolledStudents?.includes(user.userId) || false,
      progress: 0,
      lessonsCount: course.lessons?.length || 0
    }));

    return NextResponse.json(coursesWithProgress);

  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// Enroll in a course
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { courseId } = await request.json();

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    if (course.enrolledStudents.includes(user.userId)) {
      return NextResponse.json({ error: 'Already enrolled' }, { status: 400 });
    }

    course.enrolledStudents.push(user.userId);
    await course.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully enrolled in course' 
    });

  } catch (error) {
    console.error('Course enrollment error:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}
