import { NextRequest, NextResponse } from 'next/server';

type ClaudeResponse = {
  content: Array<{ text: string }>;
};

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const msg: any = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: body.messages,
    }).catch((error) => console.log(error)
    );
    return NextResponse.json(msg);
  } catch (error) {
    return NextResponse.json({ error: 'Error calling Claude API' }, { status: 500 });
  }
}