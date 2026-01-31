import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Assignment from '@/lib/models/Assignment';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Grade a submission (teachers only)
export async function POST(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can grade assignments' }, { status: 403 });
    }

    await connectDB();

    const { submissionId, grade, feedback } = await request.json();

    const assignment = await Assignment.findById(params.id);
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    const submission = assignment.submissions.id(submissionId);
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = 'graded';

    await assignment.save();

    // Award XP based on grade
    const xpReward = Math.floor((grade / assignment.totalPoints) * 50);
    await User.findByIdAndUpdate(submission.student, {
      $inc: { xp: xpReward, coins: Math.floor(xpReward / 10) }
    });

    return NextResponse.json({ success: true, message: 'Submission graded successfully' });

  } catch (error) {
    console.error('Grading error:', error);
    return NextResponse.json(
      { error: 'Failed to grade submission' },
      { status: 500 }
    );
  }
}
