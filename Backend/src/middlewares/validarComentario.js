const maximoNombre = 40;
const maximoTexto = 300;

export function validarComentario(req, res, next) {
  const { nombreAutor, textoComentario } = req.body ?? {};

  if (typeof nombreAutor !== 'string' || typeof textoComentario !== 'string') {
    return res.status(400).json({ error: 'Debes enviar nombreAutor y textoComentario como texto.' });
  }

  const nombre = nombreAutor.trim();
  const texto = textoComentario.trim();

  if (!nombre || !texto) {
    return res.status(400).json({ error: 'El nombre y el comentario no pueden estar vacíos.' });
  }

  if (nombre.length > maximoNombre || texto.length > maximoTexto) {
    return res.status(400).json({
      error: `El nombre admite hasta ${maximoNombre} caracteres y el comentario hasta ${maximoTexto}.`
    });
  }

  req.body = { nombreAutor: nombre, textoComentario: texto };
  next();
}