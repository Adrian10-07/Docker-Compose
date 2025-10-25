// Placeholder que Docker reemplazará
// Detecta si estamos dentro de Docker (hostname 'notas_backend') o localhost
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8000/api/notes'   // desde el navegador
  : 'http://52.200.208.182:8000/api/notes'; // desde Docker


const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notes-list');

let editingId = null;

async function fetchNotes() {
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();
    console.log(notes);
    renderNotes(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  if (notes.length === 0) {
    notesList.innerHTML = '<p>No tienes notas aún 🗒️</p>';
    return;
  }

  notes.forEach(note => {
    const div = document.createElement('div');
    div.classList.add('note');
    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>${new Date(note.created_at).toLocaleString()}</small>
      <div class="note-actions">
        <button onclick="editNote(${note.id}, '${note.title}', '${note.content.replace(/'/g, "\\'")}')">✏️</button>
        <button onclick="deleteNote(${note.id})">🗑️</button>
      </div>
    `;
    notesList.appendChild(div);
  });
}

async function saveNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return alert('Por favor, completa todos los campos.');

  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `${API_URL}/${editingId}` : API_URL;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  if (res.ok) {
    titleInput.value = '';
    contentInput.value = '';
    editingId = null;
    saveBtn.textContent = '💾 Guardar';
    fetchNotes();
  } else {
    alert('Ocurrió un error al guardar la nota.');
  }
}

async function deleteNote(id) {
  if (!confirm('¿Seguro que quieres eliminar esta nota?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchNotes();
}

function editNote(id, title, content) {
  editingId = id;
  titleInput.value = title;
  contentInput.value = content;
  saveBtn.textContent = '✏️ Actualizar';
}

saveBtn.addEventListener('click', saveNote);
window.onload = fetchNotes;
