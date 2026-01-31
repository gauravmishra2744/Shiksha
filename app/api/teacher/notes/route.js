import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Note from '@/lib/models/Note';
import Classroom from '@/lib/models/Classroom';
import { getAuthUser } from '@/lib/auth';

// Get all notes created by teacher
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const notes = await Note.find({ author: user.userId })
      .populate('classroom', 'name subject')
      .sort({ updatedAt: -1 })
      .lean();

    const normalized = notes.map((note) => ({
      id: note._id,
      title: note.title,
      description: note.content,
      type: 'document',
      uploadDate: note.createdAt,
      tags: note.tags || [],
      classroom: note.classroom?.name || 'General',
      subject: note.subject,
      status: note.isShared ? 'Published' : 'Draft',
      downloads: 0,
      views: 0
    }));

    return NextResponse.json({ notes: normalized });
  } catch (error) {
    console.error('Teacher notes fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// Create a new teacher note (shared content)
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user || user.role !== 'teacher') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { title, content, subject, tags, classroom, isShared = true } = await request.json();

    if (!title || !content || !classroom) {
      return NextResponse.json(
        { error: 'Title, content, and classroom are required' },
        { status: 400 }
      );
    }

    const classroomDoc = await Classroom.findById(classroom).select('subject');

    const note = await Note.create({
      title,
      content,
      subject: subject || classroomDoc?.subject || 'general',
      tags: tags || [],
      author: user.userId,
      classroom,
      isShared,
      isPinned: false
    });

    return NextResponse.json({ note, message: 'Content published successfully' }, { status: 201 });
  } catch (error) {
    console.error('Teacher note creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}
