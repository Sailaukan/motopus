import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY; 

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        if (!OPENAI_API_KEY) {
            console.error('OpenAI API key is not set');
            return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
        }

        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: text,
                n: 10,
                size: "512x512",
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('OpenAI API error:', error);

        if (axios.isAxiosError(error) && error.response) {
            console.error('OpenAI API response:', error.response.data);
            return NextResponse.json({ error: 'OpenAI API error', details: error.response.data }, { status: error.response.status });
        }

        return NextResponse.json({ error: 'Failed to generate images', details: error }, { status: 500 });
    }
}