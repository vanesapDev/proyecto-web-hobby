import {obtenerComentarios, enviarComentario} from '../api/apiComentarios.js'
const formatoFecha = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
});

function crearMensaje(texto) {
    const mensaje = document.createElement("li");
    mensaje.className = "mensajeVacio";
    mensaje.textContent = texto;
    return mensaje;
}

function crearElementoComentario(comentario) {
    const item = document.createElement("li");
    item.className = "itemComentario";

    const autor = document.createElement("p");
    autor.className = "autorComentario";
    autor.textContent = comentario.nombreAutor;

    const fecha = document.createElement("time");
    fecha.className = "fechaComentario";
    fecha.dateTime = comentario.fecha;
    fecha.textContent = formatoFecha.format(new Date(comentario.fecha));

    const texto = document.createElement("p");
    texto.className = "textoComentarioPublicado";
    texto.textContent = comentario.textoComentario;

    item.append(autor, fecha, texto);
    return item;
}

export function mostrarComentarios(lista, comentarios) {
    lista.replaceChildren();

    if (comentarios.length === 0) {
        lista.append(crearMensaje("Aún no hay comentarios. Escribe el primero."));
        return;
    }

    lista.append(...comentarios.map(crearElementoComentario));
}

function mostrarEstado(elemento, texto, clase) {
    elemento.textContent = texto;
    elemento.className = `mensajeFormulario ${clase}`.trim();
}

function iniciarFormulario(lista) {
    const formulario = document.getElementById('formularioComentarios');
    const estado = document.getElementById('mensajeFormulario');

    if (!formulario || !estado) {
        return;
    }


    const boton = formulario.querySelector('button[type="submit"]');

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const datos = Object.fromEntries(new FormData(formulario));

        boton.disabled = true;
        mostrarEstado(estado, 'Publicando...', '');

        try {
            await enviarComentario(datos);
            formulario.reset();
            mostrarComentarios(lista, await obtenerComentarios());
            mostrarEstado(estado, '¡Gracias! Tu comentario fue publicado.', 'mensajeExito');
        } catch (error) {
            const mensaje = error instanceof TypeError
                ? 'No se pudo conectar con el servidor. Intenta de nuevo.'
                : error.message;
            mostrarEstado(estado, mensaje, 'mensajeError');
        } finally {
            boton.disabled = false;
        }
    });
}

export async function iniciarComentarios() {
    const lista = document.getElementById("listaComentarios");

    if (!lista) {
        return;
    }
    iniciarFormulario(lista);

    try {
        mostrarComentarios(lista, await obtenerComentarios());
    } catch (error) {
        lista.replaceChildren(
            crearMensaje(
                "No se pudieron cargar los comentarios. Intenta de nuevo más tarde.",
            ),
        );
    }
}
