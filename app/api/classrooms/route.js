import { NextResponse } from 'next/server';

// Mock database - replace with actual database
let classrooms = [
  {
    id: 'class-1',
    name: 'Science Champions',
    teacher: 'Mrs. Pooja Kumari',
    subject: 'Biology',
    students: 28,
    isActive: false,
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  return NextResponse.json(classrooms);
}

export async function POST(request) {
  const { name, teacher, subject } = await request.json();
  
  const newClassroom = {
    id: `class-${Date.now()}`,
    name,
    teacher,
    subject,
    students: 0,
    isActive: false,
    createdAt: new Date().toISOString(),
  };
  
  classrooms.push(newClassroom);
  return NextResponse.json(newClassroom, { status: 201 });
}