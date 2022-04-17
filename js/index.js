import { collage } from '../data/collage.js';

const carrusel = document.getElementById("carrusel");
const filaCollage = document.getElementById("fila-collage");
let contador = 0;

const cargarCarrusel = () => {
    contador++;
    if (contador > 3) contador = 1;
    carrusel.setAttribute("src", "../images/banner" + contador + ".png");
    carrusel.style.filter = "brightness(0.6)";
    carrusel.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    carrusel.style.transition = "all 1s";
    setTimeout(cargarCarrusel, 3000);
}

const mostrarImgs = (collage) => {
    let collageArr = collage.map(c => {
        return `
            <div class="col-md-3 col-lg-3">
                <div class="image">
                    <img src=${c.imgPath} class="col-image" alt=${c.title}">
                    <div class="overlay">
                        <p class="h4">${c.title}</p>
                        <p class="textmuted">${c.content}</p>
                        <ul class="list-unstyled d-flex ">
                            <li><span class="fas fa-star"></span></li>
                            <li><span class="fas fa-star"></span></li>
                            <li><span class="fas fa-star"></span></li>
                            <li><span class="fas fa-star"></span></li>
                        </ul>
                    </div>
                </div>
             </div>
           `;
    })
    collageArr = collageArr.join("");
    filaCollage.innerHTML = collageArr;
}

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    cargarCarrusel();
    mostrarImgs(collage);
})