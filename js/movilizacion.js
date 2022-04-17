import { news } from "../data/news.js";

const filaDePaquetes = document.getElementById("noticias-fila");

//Creando función para mostrar las noticias en el documento
const showNews = (news) => {
    let noticiasArr = news.map(n => {
        return `
        <div class="col-4">
            <div class="my-card shadow-sm">
            <img src=${n.imgPath} class="w-100" alt=${n.title}>
            <p>${n.date}</p>
            <h3 class="my-title v-oscuro text-start">${n.title}</h3>
            <p>${n.content}</p>
            <a href=${n.link} class="btn btn-primary mb-4">Ver más</a>
            </div>  
        </div>  
           `;
    })
    noticiasArr = noticiasArr.join("");
    filaDePaquetes.innerHTML = noticiasArr;
}

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    showNews(news);
})
