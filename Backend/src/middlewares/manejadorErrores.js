export function rutaNoEncontrada(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada.' });
}

export function manejarErrores(err, req, res, next) {
  const estado = err.status ?? 500;

  if (estado === 500) {
    console.error(err);
  }

  const mensaje = estado === 500 ? 'Error interno del servidor.' : 'Petición no válida.';
  res.status(estado).json({ error: mensaje });
}