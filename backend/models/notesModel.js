import db from '../db.js';

export const getAllNotes = (callback) => {
  db.query('SELECT * FROM notes', callback);
};

export const getNoteById = (id, callback) => {
  db.query('SELECT * FROM notes WHERE id = ?', [id], callback);
};

export const createNote = (data, callback) => {
  db.query('INSERT INTO notes (title, content) VALUES (?, ?)', [data.title, data.content], callback);
};

export const updateNote = (id, data, callback) => {
  db.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [data.title, data.content, id], callback);
};

export const deleteNote = (id, callback) => {
  db.query('DELETE FROM notes WHERE id = ?', [id], callback);
};
