const maximoComentarios = 100;
const comentarios = [];
let siguienteId = 1;

export function listarComentarios() {
    return [...comentarios].reverse();
}

export function crearComentario({ nombreAutor, textoComentario }) {
    const comentario = {
        id: siguienteId++,
        nombreAutor,
        textoComentario,
        fecha: new Date().toISOString(),
    };

    comentarios.push(comentario);

    if (comentarios.length > maximoComentarios) {
        comentarios.shift();
    }

    return comentario;
}
