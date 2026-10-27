import express from 'express';
import rutasComentarios from './rutas/rutasComentarios.js';
import { rutaNoEncontrada, manejarErrores } from './middlewares/manejadorErrores.js';
import cors from 'cors';
import { opcionesCors } from './config/opcionesCors.js';
const app = express();

app.use(express.json());
app.use(cors(opcionesCors));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/comentarios', rutasComentarios);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

export default app;