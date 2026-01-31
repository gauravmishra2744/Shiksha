import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Todo from '@/lib/models/Todo';
import User from '@/lib/models/User';
import { getAuthUser } from '@/lib/auth';

// Update todo
export async function PUT(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const updates = await request.json();

    const todo = await Todo.findOneAndUpdate(
      { _id: params.id, user: user.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    // Award XP if task completed
    if (updates.completed && !todo.completed) {
      await User.findByIdAndUpdate(user.userId, {
        $inc: { xp: 5, coins: 1 }
      });
    }

    return NextResponse.json(todo);

  } catch (error) {
    console.error('Todo update error:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// Delete todo
export async function DELETE(request, { params }) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const todo = await Todo.findOneAndDelete({
      _id: params.id,
      user: user.userId
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Todo deleted' });

  } catch (error) {
    console.error('Todo deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
