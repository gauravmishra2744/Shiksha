import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  const index = db.classrooms.findIndex(c => c.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
  }
  
  db.classrooms[index] = { ...db.classrooms[index], ...body };
  
  return NextResponse.json(db.classrooms[index]);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  const index = db.classrooms.findIndex(c => c.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
  }
  
  db.classrooms.splice(index, 1);
  
  return NextResponse.json({ message: 'Classroom deleted successfully' });
}
