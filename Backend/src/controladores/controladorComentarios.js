import { listarComentarios, crearComentario } from '../servicios/servicioComentarios.js';

export function obtenerComentarios(req, res) {
  res.json(listarComentarios());
}

export function publicarComentario(req, res) {
  const { nombreAutor, textoComentario } = req.body;
  const comentario = crearComentario({ nombreAutor, textoComentario });
  res.status(201).json(comentario);
}