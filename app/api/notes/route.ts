import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Note from '@/models/Note';
import { logger } from '@/lib/logger';

// Temporary in-memory storage for notes (replace with database later)
const notes = [
  {
    _id: '1',
    title: 'Welcome to NoteHive!',
    content: 'This is your first note. Try creating more notes to get started.',
    tags: ['welcome', 'getting-started'],
    author: {
      _id: 'system',
      username: 'System'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    await connectDB();
    logger.info('Fetching notes from database');
    
    const notes = await Note.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
      
    logger.info(`Found ${notes.length} notes`);
    
    return NextResponse.json(notes);
  } catch (error) {
    logger.error('Error fetching notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    logger.info('Creating new note:', body);

    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: 'Note content is required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const note = await Note.create({
      content: body.content,
      tags: body.tags || [],
    });
    
    logger.info('Note created successfully:', note.toObject());
    return NextResponse.json(note);
  } catch (error) {
    logger.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Note ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    logger.info('Deleting note:', id);
    
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    
    logger.info('Note deleted successfully:', id);
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    logger.error('Error deleting note:', error);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
