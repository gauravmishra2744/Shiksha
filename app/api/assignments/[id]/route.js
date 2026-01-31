import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Assignment from '@/lib/models/Assignment';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Get assignment details
export async function GET(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const assignment = await Assignment.findById(params.id)
      .populate('classroom', 'name subject teacher')
      .populate('submissions.student', 'name avatar email')
      .lean();

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json(assignment);

  } catch (error) {
    console.error('Assignment details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignment details' },
      { status: 500 }
    );
  }
}

// Submit assignment (students)
export async function POST(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { content, files } = await request.json();

    const assignment = await Assignment.findById(params.id);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      s => s.student.toString() === user.userId
    );

    if (existingSubmission) {
      return NextResponse.json({ error: 'Already submitted' }, { status: 400 });
    }

    const isLate = new Date() > new Date(assignment.dueDate);

    assignment.submissions.push({
      student: user.userId,
      content,
      files: files || [],
      submittedAt: new Date(),
      status: isLate ? 'late' : 'submitted'
    });

    await assignment.save();

    // Award XP for submitting on time
    if (!isLate) {
      await User.findByIdAndUpdate(user.userId, {
        $inc: { xp: 20, coins: 5 }
      });
    }

    const updatedAssignment = await Assignment.findById(params.id)
      .populate('submissions.student', 'name avatar');

    return NextResponse.json(updatedAssignment);

  } catch (error) {
    console.error('Assignment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit assignment' },
      { status: 500 }
    );
  }
}

// Update assignment (teachers)
export async function PUT(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can update assignments' }, { status: 403 });
    }

    await connectDB();

    const updates = await request.json();

    const assignment = await Assignment.findByIdAndUpdate(
      params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('classroom', 'name subject');

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json(assignment);

  } catch (error) {
    console.error('Assignment update error:', error);
    return NextResponse.json(
      { error: 'Failed to update assignment' },
      { status: 500 }
    );
  }
}
