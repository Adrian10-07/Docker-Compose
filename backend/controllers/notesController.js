import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../models/notesModel.js';

export const getNotes = (req, res) => {
  getAllNotes((err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener las notas', error: err });
    res.json(result);
  });
};

export const getNote = (req, res) => {
  const { id } = req.params;
  getNoteById(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener la nota' });
    if (result.length === 0) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json(result[0]);
  });
};

export const addNote = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Faltan datos' });

  createNote({ title, content }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear la nota', error: err });
    res.status(201).json({ message: 'Nota creada correctamente', id: result.insertId });
  });
};

export const editNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  updateNote(id, { title, content }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar la nota', error: err });
    res.json({ message: 'Nota actualizada correctamente' });
  });
};

export const removeNote = (req, res) => {
  const { id } = req.params;
  deleteNote(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar la nota', error: err });
    res.json({ message: 'Nota eliminada correctamente' });
  });
};
