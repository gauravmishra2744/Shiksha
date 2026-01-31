import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Assignment from '@/lib/models/Assignment';
import { getAuthUser } from '@/lib/auth';

// Get all assignments
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const classroomId = searchParams.get('classroom');
    const status = searchParams.get('status');

    let query = {};
    if (classroomId) query.classroom = classroomId;
    if (status) query.status = status;

    const assignments = await Assignment.find(query)
      .populate('classroom', 'name subject teacher')
      .populate('submissions.student', 'name avatar')
      .sort({ dueDate: -1 })
      .lean();

    return NextResponse.json(assignments);

  } catch (error) {
    console.error('Assignments fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  }
}

// Create a new assignment (teachers only)
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can create assignments' }, { status: 403 });
    }

    await connectDB();

    const { title, description, classroom, dueDate, totalPoints, attachments } = await request.json();

    const assignment = await Assignment.create({
      title,
      description,
      classroom,
      dueDate,
      totalPoints: totalPoints || 100,
      attachments: attachments || [],
      submissions: [],
      status: 'draft'
    });

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('classroom', 'name subject');

    return NextResponse.json(populatedAssignment, { status: 201 });

  } catch (error) {
    console.error('Assignment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}
