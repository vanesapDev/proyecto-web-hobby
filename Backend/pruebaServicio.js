    import { crearComentario, listarComentarios } from './src/servicios/servicioComentarios.js';

crearComentario({ nombreAutor: 'Prueba uno', textoComentario: 'Primer comentario' });
crearComentario({ nombreAutor: 'Prueba dos', textoComentario: 'Segundo comentario' });

console.log(listarComentarios());