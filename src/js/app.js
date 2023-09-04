document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp() {
    crearGaleria();
    scrollNav();
}

function scrollNav () {
    
    const enlaces = document.querySelectorAll('.nav-principal a');
    enlaces.forEach(enlace => {

        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value);
            section.scrollIntoView(
                {behavior: 'smooth'}
            );
        });
        
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //crea el overlay (ventana modal)con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');  //clase css del overlay
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //boton para cerrar la imagen
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent='X';
    cerrarModal.classList.add('btn-cerrar')

    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();

    }
    overlay.appendChild(cerrarModal);

    //añade al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}