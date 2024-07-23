import { NextResponse } from 'next/server'
import { connectToMongoDB } from '../../../lib/connectDB';
import User from '../../../app/Model/ProjectModel';

export async function GET(request: Request) {
  try {
    await connectToMongoDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const user = await User.findOne({ userId: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.videoCommands);
  } catch (error) {
    console.error('Error fetching video commands:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}