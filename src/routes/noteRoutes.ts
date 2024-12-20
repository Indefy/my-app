import express from 'express';
import { createNote, getNotes, getNoteById, updateNote, deleteNote, searchNotes } from '../controllers/noteController';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, createNote);
router.get('/', getNotes);
router.get('/search', searchNotes);
router.get('/:id', getNoteById);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

export default router;

