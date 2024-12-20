import { Request, Response } from 'express';
import Note from '../models/Note';
import { UserPayload } from '../types/auth';

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const newNote = await Note.create({ 
      title, 
      content, 
      tags, 
      author: (req.user as UserPayload).id 
    });
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err.message });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({ author: (req.user as UserPayload).id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments({ author: (req.user as UserPayload).id });

    res.status(200).json({
      notes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalNotes: total
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.author.toString() !== (req.user as UserPayload).id) {
      return res.status(403).json({ message: 'Not authorized to access this note' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note', error: err.message });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.author.toString() !== (req.user as UserPayload).id) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    
    note.title = title;
    note.content = content;
    note.tags = tags;
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err.message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.author.toString() !== (req.user as UserPayload).id) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }
    
    await note.remove();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err.message });
  }
};

