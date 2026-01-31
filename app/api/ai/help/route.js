import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Doubt from '@/lib/models/Doubt';
import { getAuthUser } from '@/lib/auth';

// AI-powered doubt assistance
export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { doubtId, question, model = 'gpt-3.5-turbo', apiKey: userApiKey } = await request.json();
    const apiKey = userApiKey || process.env.AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI integration is not configured. Please provide an API key.' },
        { status: 400 }
      );
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful tutor. Provide clear, step-by-step explanations for students. Keep it concise and accurate.'
          },
          { role: 'user', content: question }
        ],
        max_tokens: 500
      })
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      console.error('AI API Error:', errorData);
      return NextResponse.json(
        { error: 'Error from AI Service: ' + (errorData.error?.message || 'Unknown error') },
        { status: aiResponse.status }
      );
    }

    const aiData = await aiResponse.json();
    const aiText = aiData.choices?.[0]?.message?.content || 'No response generated.';

    // If doubtId provided, add AI response to doubt
    if (doubtId) {
      const doubt = await Doubt.findById(doubtId);
      if (doubt) {
        doubt.responses.push({
          user: null, // AI response
          content: aiText,
          isTeacher: false,
          helpful: 0,
          createdAt: new Date()
        });
        await doubt.save();
      }
    }

    return NextResponse.json({
      success: true,
      response: aiText
    });

  } catch (error) {
    console.error('AI assistance error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI assistance' },
      { status: 500 }
    );
  }
}
