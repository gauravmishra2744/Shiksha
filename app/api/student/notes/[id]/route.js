import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Note from '@/lib/models/Note';
import { getAuthUser } from '@/lib/auth';

// Get note by ID
export async function GET(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const note = await Note.findOne({
      _id: params.id,
      $or: [
        { student: user.userId },
        { sharedWith: user.userId }
      ]
    }).populate('classroom', 'name');

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);

  } catch (error) {
    console.error('Note fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

// Update note
export async function PUT(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const updates = await request.json();

    const note = await Note.findOneAndUpdate(
      { _id: params.id, student: user.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);

  } catch (error) {
    console.error('Note update error:', error);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// Delete note
export async function DELETE(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const note = await Note.findOneAndDelete({
      _id: params.id,
      student: user.userId
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Note deleted' });

  } catch (error) {
    console.error('Note deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
