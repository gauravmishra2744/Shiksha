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

export async function POST(request, { params }) {
  const { id } = params;
  
  const classroom = classrooms.find(c => c.id === id);
  if (!classroom) {
    return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
  }
  
  classroom.isActive = true;
  classroom.activatedAt = new Date().toISOString();
  
  return NextResponse.json({ 
    message: 'Classroom activated successfully',
    classroom 
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  const classroom = classrooms.find(c => c.id === id);
  if (!classroom) {
    return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
  }
  
  classroom.isActive = false;
  classroom.deactivatedAt = new Date().toISOString();
  
  return NextResponse.json({ 
    message: 'Classroom deactivated successfully',
    classroom 
  });
}