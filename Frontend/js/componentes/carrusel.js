export function iniciarCarrusel(){
    const carrusel= document.querySelector('.carruselGaleria');
    const botonAnterior= document.getElementById('botonAnterior');
    const botonSiguiente=document.getElementById('botonSiguiente');
    const contador = document.getElementById('contadorCarrusel');
    const puntos=document.getElementById('puntosCarrusel');

    if(!carrusel || !botonAnterior || !botonSiguiente || !contador || !puntos){
        return;
    }
    
    const diapositivas = carrusel.querySelectorAll('.figuraGaleria');
    const total = diapositivas.length;
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let indiceActual = 0;

    function irA(indice){
        diapositivas[indice].scrollIntoView({
            behavior: reducirMovimiento ? 'auto' : 'smooth',
            inline: 'start',
            block: 'nearest'
        });
    }

    const botonesPunto=Array.from(diapositivas, (diapositiva, indice)=>{
        const boton = document.createElement('button');
        boton.type='button';
        boton.className='puntoCarrusel';
        boton.setAttribute('aria-label',  `Ir a la imagen ${indice + 1}`);
        boton.addEventListener('click',()=>irA(indice));
        puntos.appendChild(boton);
        return boton;
    });

    function actualizar(){
        const bordeCarrusel = carrusel.getBoundingClientRect().left;
        let menorDistancia=Infinity;

        diapositivas.forEach((diapositivas, indice)=>{
            const distancia = Math.abs(diapositivas.getBoundingClientRect().left - bordeCarrusel);
            if(distancia < menorDistancia){
                menorDistancia = distancia;
                indiceActual = indice;
            }
        });

        contador.textContent = `${indiceActual + 1} de ${total}`;
        botonAnterior.disabled=indiceActual===0;
        botonSiguiente.disabled=indiceActual=== total - 1;

        botonesPunto.forEach((boton, indice)=>{
            if(indice === indiceActual){
                boton.setAttribute('aria-current', 'true');
            }else{
                boton.removeAttribute('aria-current');
            }
        });
    }
    botonAnterior.addEventListener('click', ()=>{
        console.log('clic en anterior, indice actual:',indiceActual )
        irA(indiceActual - 1)
    });
    botonSiguiente.addEventListener('click',()=>{
        console.log('clic en siguente, indice actual:',indiceActual )
        irA(indiceActual + 1)

    })
    carrusel.addEventListener('scroll', actualizar, {passive: true});
    actualizar();
}
