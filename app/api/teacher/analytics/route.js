import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import Classroom from '@/lib/models/Classroom';
import Assignment from '@/lib/models/Assignment';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const classroomId = searchParams.get('classroom');
    const period = searchParams.get('period') || '7'; // days

    // Get classrooms
    let classroomQuery = { teacher: user.userId };
    if (classroomId) classroomQuery._id = classroomId;

    const classrooms = await Classroom.find(classroomQuery)
      .populate('students', 'name xp')
      .lean();

    // Get assignments
    const assignments = await Assignment.find({
      classroom: { $in: classrooms.map(c => c._id) }
    }).populate('submissions.student', 'name').lean();

    // Calculate analytics
    const totalStudents = classrooms.reduce((sum, c) => sum + c.students.length, 0);
    const totalAssignments = assignments.length;

    // Submission rate
    let totalExpected = 0;
    let totalSubmitted = 0;
    assignments.forEach(assignment => {
      const classroomStudents = classrooms.find(
        c => c._id.toString() === assignment.classroom.toString()
      )?.students.length || 0;
      totalExpected += classroomStudents;
      totalSubmitted += assignment.submissions.length;
    });
    const submissionRate = totalExpected > 0 ? (totalSubmitted / totalExpected * 100).toFixed(1) : 0;

    // Average grades
    let totalGrades = 0;
    let gradedCount = 0;
    assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        if (submission.grade !== undefined && submission.grade !== null) {
          totalGrades += submission.grade;
          gradedCount++;
        }
      });
    });
    const averageGrade = gradedCount > 0 ? (totalGrades / gradedCount).toFixed(1) : 0;

    // Top performers
    const allStudents = classrooms.flatMap(c => c.students);
    const topPerformers = allStudents
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10)
      .map(s => ({
        name: s.name,
        xp: s.xp
      }));

    // Assignment completion trend (last 7 days)
    const days = parseInt(period);
    const trend = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const daySubmissions = assignments.reduce((count, assignment) => {
        const daySubmissionCount = assignment.submissions.filter(sub => {
          const subDate = new Date(sub.submittedAt);
          return subDate >= date && subDate < new Date(date.getTime() + 24 * 60 * 60 * 1000);
        }).length;
        return count + daySubmissionCount;
      }, 0);

      trend.push({
        date: date.toISOString().split('T')[0],
        submissions: daySubmissions
      });
    }

    const analytics = {
      overview: {
        totalStudents,
        totalAssignments,
        submissionRate,
        averageGrade
      },
      topPerformers,
      submissionTrend: trend,
      classroomBreakdown: classrooms.map(c => ({
        name: c.name,
        students: c.students.length,
        averageXP: c.students.length > 0 
          ? (c.students.reduce((sum, s) => sum + s.xp, 0) / c.students.length).toFixed(0)
          : 0
      }))
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
