import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shiksha';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Mock database for fallback/development (kept for compatibility)
export const db = {
  users: [
    { id: "student-1", name: "Student User", role: "student", email: "student@example.com" },
    { id: "teacher-1", name: "Ms. Shruti Kumari", role: "teacher", email: "teacher@example.com" }
  ],
  classrooms: [
    {
      id: "class-1",
      name: "Class 10 - Mathematics A",
      teacherId: "teacher-1",
      teacher: "Ms. Shruti Kumari",
      subject: "Mathematics",
      students: 28,
      status: "Active",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      nextClass: "Tomorrow at 9:00 AM",
      createdAt: new Date().toISOString(),
    },
    {
      id: "class-2",
      name: "Class 9 - Mathematics B",
      teacherId: "teacher-1",
      teacher: "Ms. Shruti Kumari",
      subject: "Mathematics",
      students: 25,
      status: "Active",
      schedule: "Tue, Thu - 10:00 AM",
      nextClass: "Today at 2:00 PM",
      createdAt: new Date().toISOString(),
    },
    {
      id: "class-3",
      name: "Class 8 - Basic Math",
      teacherId: "teacher-1",
      teacher: "Ms. Shruti Kumari",
      subject: "Mathematics",
      students: 30,
      status: "Active",
      schedule: "Mon, Wed - 11:00 AM",
      nextClass: "Wednesday at 11:00 AM",
      createdAt: new Date().toISOString(),
    }
  ],
  enrollments: [
    { studentId: "student-1", classroomId: "class-1" },
    { studentId: "student-1", classroomId: "class-3" }
  ],
  assignments: [
    {
      id: "assign-1",
      classroomId: "class-1",
      title: "Algebra Worksheet 1",
      dueDate: "2024-02-15",
      status: "Pending"
    }
  ]
};
