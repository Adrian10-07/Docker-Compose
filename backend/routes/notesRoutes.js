import express from 'express';
import { getNotes, getNote, addNote, editNote, removeNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', addNote);
router.put('/:id', editNote);
router.delete('/:id', removeNote);

export default router;
