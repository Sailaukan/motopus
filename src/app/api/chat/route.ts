import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const chatCompletion = await openai.chat.completions.create({
            model: "o1-preview",
            messages: messages,
            // max_tokens: 2000,
        });

        return NextResponse.json({
            choices: [
                {
                    message: {
                        content: chatCompletion.choices[0].message.content
                    }
                }
            ]
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}