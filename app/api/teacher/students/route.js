import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Classroom from '@/lib/models/Classroom';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get students in teacher's classrooms
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const classroomId = searchParams.get('classroom');

    let classroomQuery = { teacher: user.userId };
    if (classroomId) classroomQuery._id = classroomId;

    const classrooms = await Classroom.find(classroomQuery)
      .populate('students', 'name email avatar grade xp level streak')
      .lean();

    // Get unique students
    const studentMap = new Map();
    classrooms.forEach(classroom => {
      classroom.students.forEach(student => {
        if (!studentMap.has(student._id.toString())) {
          studentMap.set(student._id.toString(), {
            ...student,
            classrooms: [{ id: classroom._id, name: classroom.name }]
          });
        } else {
          const existing = studentMap.get(student._id.toString());
          existing.classrooms.push({ id: classroom._id, name: classroom.name });
        }
      });
    });

    const students = Array.from(studentMap.values());

    return NextResponse.json(students);

  } catch (error) {
    console.error('Students fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}
