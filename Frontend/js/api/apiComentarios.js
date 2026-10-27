import { urlApi } from '../configuracion.js';

export async function obtenerComentarios() {
  const respuesta = await fetch(`${urlApi}/comentarios`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los comentarios.');
  }

  return respuesta.json();
}

export async function enviarComentario(datos) {
  const respuesta = await fetch(`${urlApi}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.error ?? 'No se pudo publicar el comentario.');
  }

  return resultado;
}