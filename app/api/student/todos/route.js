import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Todo from '@/lib/models/Todo';
import { getAuthUser } from '@/lib/auth';

// Get all todos
export async function GET(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const todos = await Todo.find({ user: user.userId })
      .populate('relatedTo')
      .sort({ completed: 1, dueDate: 1 })
      .lean();

    return NextResponse.json(todos);

  } catch (error) {
    console.error('Todos fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// Create a new todo
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { title, description, priority, dueDate, category, relatedTo, relatedToModel } = await request.json();

    const todo = await Todo.create({
      title,
      description,
      user: user.userId,
      priority: priority || 'medium',
      dueDate,
      category: category || 'other',
      relatedTo,
      relatedToModel,
      completed: false
    });

    return NextResponse.json(todo, { status: 201 });

  } catch (error) {
    console.error('Todo creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
