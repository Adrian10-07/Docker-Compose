import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

// 🟢 Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());

// O también puedes hacerlo más específico (opcional):
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('📝 API de Bloc de Notas funcionando');
});

export default app;
