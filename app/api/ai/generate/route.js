import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, model = 'gpt-3.5-turbo', apiKey: userApiKey } = await req.json();
    const apiKey = userApiKey || process.env.AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { response: "AI integration is not configured. Please provide an API key." },
        { status: 400 } // Changed to 400 to indicate missing requirement
      );
    }

    // Call OpenAI API
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }],
        max_tokens: 500
      })
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      console.error("AI API Error:", errorData);
      return NextResponse.json(
        { response: "Error from AI Service: " + (errorData.error?.message || "Unknown error") },
        { status: aiResponse.status }
      );
    }

    const data = await aiResponse.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error("AI Route Exception:", error);
    return NextResponse.json(
      { response: "Internal Server Error during AI processing." },
      { status: 500 }
    );
  }
}
