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
            max_completion_tokens: 10000,
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
    } catch (error: any) {
        console.error('OpenAI API error details:');
        return NextResponse.json({ error: error.response?.data || error.message }, { status: 500 });
    }
}