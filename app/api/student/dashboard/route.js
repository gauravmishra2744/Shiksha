import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import Classroom from '@/lib/models/Classroom';
import Assignment from '@/lib/models/Assignment';
import { Badge, UserBadge } from '@/lib/models/Badge';
import { getAuthUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get user details
    const userData = await User.findById(user.userId)
      .select('-password')
      .populate('badges');

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get enrolled classrooms
    const classrooms = await Classroom.find({
      students: user.userId
    }).populate('teacher', 'name');

    // Get pending assignments
    const assignments = await Assignment.find({
      classroom: { $in: classrooms.map(c => c._id) },
      status: 'published',
      dueDate: { $gte: new Date() }
    }).populate('classroom', 'name subject');

    // Get user badges
    const userBadges = await UserBadge.find({
      user: user.userId
    }).populate('badge');

    // Calculate next level XP
    const nextLevelXP = (userData.level) * 500;

    // Get leaderboard (top 10 students)
    const leaderboard = await User.find({
      role: 'student'
    })
      .select('name xp avatar')
      .sort({ xp: -1 })
      .limit(10)
      .lean();

    const leaderboardWithPosition = leaderboard.map((student, index) => ({
      name: student.name,
      xp: student.xp,
      position: index + 1,
      avatar: student.avatar,
      isCurrentUser: student._id.toString() === user.userId
    }));

    // Weekly progress (last 7 days login streak)
    const weeklyProgress = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    for (let i = 0; i < 7; i++) {
      const dayIndex = (today - 6 + i + 7) % 7;
      weeklyProgress.push({
        day: days[dayIndex],
        completed: i < userData.streak
      });
    }

    const dashboardData = {
      name: userData.name,
      grade: userData.grade,
      avatar: userData.avatar,
      streak: userData.streak,
      totalXP: userData.xp,
      coins: userData.coins,
      level: userData.level,
      nextLevelXP,
      classroom: classrooms.length > 0 ? {
        name: classrooms[0].name,
        teacher: classrooms[0].teacher?.name || 'Unknown',
        students: classrooms[0].students.length,
        nextClass: classrooms[0].nextClass,
        subject: classrooms[0].subject
      } : null,
      badges: userBadges.map(ub => ({
        name: ub.badge.name,
        icon: ub.badge.icon,
        earned: true,
        date: ub.earnedAt
      })),
      leaderboard: leaderboardWithPosition,
      weeklyProgress,
      upcomingAssignments: assignments.slice(0, 5).map(a => ({
        id: a._id,
        title: a.title,
        classroom: a.classroom.name,
        subject: a.classroom.subject,
        dueDate: a.dueDate,
        status: 'Pending'
      })),
      stats: {
        totalClasses: classrooms.length,
        completedCourses: 0,
        averageGrade: 0,
        studyHours: Math.floor(userData.xp / 50)
      }
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
