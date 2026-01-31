import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Classroom from '@/lib/models/Classroom';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get all classrooms
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let query = {};
    
    // Teachers see only their classrooms
    if (user.role === 'teacher') {
      query.teacher = user.userId;
    } 
    // Students see only classrooms they're enrolled in
    else if (user.role === 'student') {
      query.students = user.userId;
    }

    const classrooms = await Classroom.find(query)
      .populate('teacher', 'name avatar')
      .populate('students', 'name avatar')
      .lean();

    const classroomsWithCount = classrooms.map(classroom => ({
      ...classroom,
      id: classroom._id,
      teacher: classroom.teacher?.name || 'Unknown Teacher',
      teacherId: classroom.teacher?._id,
      students: classroom.students.length
    }));

    return NextResponse.json({ classrooms: classroomsWithCount });

  } catch (error) {
    console.error('Classrooms fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classrooms' },
      { status: 500 }
    );
  }
}

// Create a new classroom (teachers only)
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can create classrooms' }, { status: 403 });
    }

    await connectDB();

    const { name, description, subject, schedule } = await request.json();
    
    const newClassroom = await Classroom.create({
      name,
      description,
      subject,
      teacher: user.userId,
      schedule: schedule || 'Not Scheduled',
      students: [],
      status: 'Active',
      nextClass: 'Not Scheduled',
      announcements: [],
      resources: []
    });

    const populatedClassroom = await Classroom.findById(newClassroom._id)
      .populate('teacher', 'name avatar');

    return NextResponse.json(populatedClassroom, { status: 201 });

  } catch (error) {
    console.error('Classroom creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create classroom' },
      { status: 500 }
    );
  }
}
