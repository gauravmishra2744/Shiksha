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

    // Get teacher details
    const teacherData = await User.findById(user.userId).select('-password');

    // Get teacher's classrooms
    const classrooms = await Classroom.find({ teacher: user.userId })
      .populate('students', 'name avatar')
      .lean();

    // Get total students
    const totalStudents = classrooms.reduce((sum, c) => sum + c.students.length, 0);

    // Get assignments
    const assignments = await Assignment.find({
      classroom: { $in: classrooms.map(c => c._id) }
    }).lean();

    // Get pending submissions
    const pendingSubmissions = assignments.reduce((count, assignment) => {
      const expectedSubmissions = classrooms.find(
        c => c._id.toString() === assignment.classroom.toString()
      )?.students.length || 0;
      const actualSubmissions = assignment.submissions.length;
      return count + (expectedSubmissions - actualSubmissions);
    }, 0);

    // Get recent activities
    const recentActivities = [];
    assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        recentActivities.push({
          type: 'submission',
          title: `New submission for ${assignment.title}`,
          time: submission.submittedAt,
          status: submission.status
        });
      });
    });
    recentActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

    const dashboardData = {
      teacher: {
        name: teacherData.name,
        email: teacherData.email,
        avatar: teacherData.avatar,
        subjects: teacherData.subjects || [],
        experience: teacherData.experience || 0
      },
      stats: {
        totalClassrooms: classrooms.length,
        totalStudents,
        totalAssignments: assignments.length,
        pendingSubmissions
      },
      classrooms: classrooms.map(c => ({
        id: c._id,
        name: c.name,
        subject: c.subject,
        students: c.students.length,
        status: c.status
      })),
      recentActivities: recentActivities.slice(0, 10),
      upcomingClasses: classrooms
        .filter(c => c.nextClass !== 'Not Scheduled')
        .slice(0, 5)
        .map(c => ({
          id: c._id,
          name: c.name,
          subject: c.subject,
          time: c.nextClass
        }))
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Teacher dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teacher dashboard' },
      { status: 500 }
    );
  }
}
