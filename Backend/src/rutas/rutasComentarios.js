import { Router } from 'express';
import { obtenerComentarios, publicarComentario } from '../controladores/controladorComentarios.js';
import { validarComentario } from '../middlewares/validarComentario.js';

const enrutador = Router();

enrutador.get('/', obtenerComentarios);
enrutador.post('/', validarComentario, publicarComentario);

export default enrutador;