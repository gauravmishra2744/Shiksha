import mongoose from 'mongoose';
import { connectDB } from '../lib/db.js';
import User from '../lib/models/User.js';
import Classroom from '../lib/models/Classroom.js';
import Course from '../lib/models/Course.js';
import { Badge } from '../lib/models/Badge.js';
import Assignment from '../lib/models/Assignment.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Classroom.deleteMany({});
    await Course.deleteMany({});
    await Badge.deleteMany({});
    await Assignment.deleteMany({});
    
    // Create users
    console.log('👥 Creating users...');
    const teacher = await User.create({
      name: 'Ms. Shruti Kumari',
      email: 'teacher@example.com',
      password: 'password123',
      role: 'teacher',
      subjects: ['Mathematics', 'Physics'],
      experience: 5,
      qualification: 'M.Sc. Mathematics',
      xp: 1000,
      level: 3
    });

    const students = await User.create([
      {
        name: 'Gaurav Mishra',
        email: 'student@example.com',
        password: 'password123',
        role: 'student',
        grade: '10th Grade',
        xp: 2450,
        level: 5,
        coins: 325,
        streak: 15
      },
      {
        name: 'Anshika Sharma',
        email: 'anshika@example.com',
        password: 'password123',
        role: 'student',
        grade: '10th Grade',
        xp: 2680,
        level: 6,
        coins: 350,
        streak: 20
      },
      {
        name: 'Shruti Kumari',
        email: 'shruti@example.com',
        password: 'password123',
        role: 'student',
        grade: '10th Grade',
        xp: 2340,
        level: 5,
        coins: 300,
        streak: 12
      },
      {
        name: 'Akanksha Das',
        email: 'akanksha@example.com',
        password: 'password123',
        role: 'student',
        grade: '10th Grade',
        xp: 2210,
        level: 5,
        coins: 280,
        streak: 10
      }
    ]);

    console.log(`✅ Created ${students.length + 1} users`);

    // Create classrooms
    console.log('🏫 Creating classrooms...');
    const classrooms = await Classroom.create([
      {
        name: 'Class 10 - Mathematics A',
        description: 'Advanced Mathematics for 10th Grade',
        subject: 'Mathematics',
        teacher: teacher._id,
        students: students.map(s => s._id),
        schedule: 'Mon, Wed, Fri - 9:00 AM',
        status: 'Active',
        nextClass: 'Tomorrow at 9:00 AM',
        announcements: [
          {
            title: 'Test Next Week',
            content: 'Chapter 5 test will be held next Monday. Please prepare well.',
            createdAt: new Date()
          }
        ]
      },
      {
        name: 'Class 9 - Mathematics B',
        description: 'Foundation Mathematics',
        subject: 'Mathematics',
        teacher: teacher._id,
        students: [students[0]._id, students[1]._id],
        schedule: 'Tue, Thu - 10:00 AM',
        status: 'Active',
        nextClass: 'Today at 2:00 PM'
      },
      {
        name: 'Class 10 - Physics',
        description: 'Physics for Class 10',
        subject: 'Physics',
        teacher: teacher._id,
        students: [students[0]._id, students[2]._id, students[3]._id],
        schedule: 'Mon, Wed - 11:00 AM',
        status: 'Active',
        nextClass: 'Wednesday at 11:00 AM'
      }
    ]);

    console.log(`✅ Created ${classrooms.length} classrooms`);

    // Create courses
    console.log('📚 Creating courses...');
    const courses = await Course.create([
      {
        title: 'Advanced Algebra',
        description: 'Master algebraic concepts and problem-solving techniques',
        subject: 'Mathematics',
        grade: '10th Grade',
        instructor: teacher._id,
        difficulty: 'Advanced',
        totalDuration: '40 hours',
        isPublished: true,
        lessons: [
          {
            title: 'Introduction to Polynomials',
            description: 'Understanding polynomial expressions',
            content: 'Polynomial basics and operations...',
            duration: '45 min',
            order: 1
          },
          {
            title: 'Quadratic Equations',
            description: 'Solving quadratic equations',
            content: 'Methods for solving quadratic equations...',
            duration: '60 min',
            order: 2
          }
        ],
        rating: 4.8,
        tags: ['algebra', 'mathematics', 'equations']
      },
      {
        title: 'Introduction to Physics',
        description: 'Explore the fundamental principles of physics',
        subject: 'Physics',
        grade: '10th Grade',
        instructor: teacher._id,
        difficulty: 'Beginner',
        totalDuration: '35 hours',
        isPublished: true,
        lessons: [
          {
            title: 'Motion and Forces',
            description: "Newton's laws of motion",
            content: 'Understanding motion and forces...',
            duration: '50 min',
            order: 1
          }
        ],
        rating: 4.6,
        tags: ['physics', 'mechanics', 'forces']
      }
    ]);

    // Enroll students in courses
    courses[0].enrolledStudents = [students[0]._id, students[1]._id];
    await courses[0].save();

    console.log(`✅ Created ${courses.length} courses`);

    // Create badges
    console.log('🏆 Creating badges...');
    const badges = await Badge.create([
      {
        name: 'Math Wizard',
        description: 'Complete 10 math assignments',
        icon: '🧮',
        type: 'achievement',
        xpReward: 100,
        coinReward: 20,
        rarity: 'rare'
      },
      {
        name: 'Reading Star',
        description: 'Complete 5 courses',
        icon: '📚',
        type: 'milestone',
        xpReward: 150,
        coinReward: 30,
        rarity: 'epic'
      },
      {
        name: 'Science Explorer',
        description: 'Master science concepts',
        icon: '🔬',
        type: 'achievement',
        xpReward: 80,
        coinReward: 15,
        rarity: 'rare'
      },
      {
        name: 'Perfect Week',
        description: '7-day login streak',
        icon: '⭐',
        type: 'special',
        xpReward: 200,
        coinReward: 50,
        rarity: 'legendary'
      },
      {
        name: 'Team Player',
        description: 'Help 10 students with doubts',
        icon: '🤝',
        type: 'achievement',
        xpReward: 120,
        coinReward: 25,
        rarity: 'epic'
      },
      {
        name: 'Quick Learner',
        description: 'Complete a course in under 2 weeks',
        icon: '⚡',
        type: 'special',
        xpReward: 180,
        coinReward: 40,
        rarity: 'legendary'
      }
    ]);

    console.log(`✅ Created ${badges.length} badges`);

    // Create assignments
    console.log('📝 Creating assignments...');
    const assignments = await Assignment.create([
      {
        title: 'Algebra Worksheet 1',
        description: 'Solve polynomial equations',
        classroom: classrooms[0]._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalPoints: 100,
        status: 'published'
      },
      {
        title: 'Physics Lab Report',
        description: 'Document your pendulum experiment',
        classroom: classrooms[2]._id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        totalPoints: 100,
        status: 'published'
      }
    ]);

    console.log(`✅ Created ${assignments.length} assignments`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧑‍🎓 Student Account:');
    console.log('   Email: student@example.com');
    console.log('   Password: password123');
    console.log('\n👨‍🏫 Teacher Account:');
    console.log('   Email: teacher@example.com');
    console.log('   Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
};

seedDatabase();
