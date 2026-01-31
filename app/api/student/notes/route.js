import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Note from '@/lib/models/Note';
import Classroom from '@/lib/models/Classroom';
import { getAuthUser } from '@/lib/auth';

// Get all notes for student
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const search = searchParams.get('search');

    const classrooms = await Classroom.find({ students: user.userId })
      .select('_id')
      .lean();
    const classroomIds = classrooms.map((c) => c._id);

    const orConditions = [
      { student: user.userId },
      {
        isShared: true,
        $or: [
          { sharedWith: user.userId },
          { classroom: { $in: classroomIds } }
        ]
      }
    ];

    const andConditions = [];
    if (subject) andConditions.push({ subject });
    if (search) andConditions.push({ $text: { $search: search } });

    const query = andConditions.length
      ? { $and: [{ $or: orConditions }, ...andConditions] }
      : { $or: orConditions };

    const notes = await Note.find(query)
      .populate('classroom', 'name subject')
      .populate('author', 'name avatar role')
      .sort({ isPinned: -1, updatedAt: -1 })
      .lean();

    const normalized = notes.map((note) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags || [],
      date: note.updatedAt || note.createdAt,
      author: note.author?.name || 'Unknown',
      authorAvatar: note.author?.avatar || null,
      isOwn: note.student?.toString() === user.userId,
      classroom: note.classroom?.name || null,
      isShared: note.isShared
    }));

    return NextResponse.json({ notes: normalized });

  } catch (error) {
    console.error('Notes fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

// Create a new note
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { title, content, subject, tags, classroom, color } = await request.json();

    const note = await Note.create({
      title,
      content,
      subject,
      tags: tags || [],
      student: user.userId,
      author: user.userId,
      classroom,
      color: color || '#ffffff',
      isPinned: false,
      isShared: false
    });

    return NextResponse.json(note, { status: 201 });

  } catch (error) {
    console.error('Note creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
