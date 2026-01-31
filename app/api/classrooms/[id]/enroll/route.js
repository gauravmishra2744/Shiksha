import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req, { params }) {
  const { id } = params; // classroomId
  const studentId = "student-1"; // Mock session

  // Check if already enrolled
  const existing = db.enrollments.find(e => e.studentId === studentId && e.classroomId === id);
  if (existing) {
    return NextResponse.json({ message: "Already enrolled" }, { status: 400 });
  }

  db.enrollments.push({ studentId, classroomId: id });
  
  // Update student count in classroom
  const classroom = db.classrooms.find(c => c.id === id);
  if (classroom) {
    classroom.students += 1;
  }

  return NextResponse.json({ message: "Enrolled successfully" });
}
