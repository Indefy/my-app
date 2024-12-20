import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/models/Note';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const searchRegex = new RegExp(query, 'i');
    const notes = await Note.find({
      $or: [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex }
      ]
    });

    return NextResponse.json(notes);
  } catch (error) {
    logger.error('Error searching notes:', error);
    return NextResponse.json(
      { error: 'Error searching notes' },
      { status: 500 }
    );
  }
}
