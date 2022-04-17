import { env } from "../data/env.js";
import { recPoints } from "../data/rec_points.js";

//Llamando a los elmentos del HTML que se van a manipular
const reciclandCard = document.getElementById('reciclando');
const otraManeraCard = document.getElementById('otro');
const puedoIrCard = document.getElementById('puedo-ir');
const venARecogerCard = document.getElementById('ven-a-recoger');
const contacto = document.getElementById('formulario-contacto');
const recCard = document.getElementById('section-card');
const districts = ["Lince", "Miraflores", "San Miguel"];
const listDistricts = document.getElementById("items-distritos");
const districtsBtn = document.getElementById("distritos");

//Function para obtener los valores del formulario 
const getInputVal = (id) => {
    return document.getElementById(id).value;
};

const sendEmail = (email, subject, name, phone, message) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: env.username,
        Password: env.password,
        To: 'ecowasi.soporte@gmail.com',
        From: `${email}`,
        Subject: `${subject}`,
        Body: `Nombre: ${name} 
        <br> Email: ${email}
        <br> Teléfono: ${phone}
        <br> Mensaje: ${message}
        `,
    }).then(
        message => alert("Correo enviado exitosamente")
    );
}

//Funcion para enviar datos de formulario
const submitForm = (e) => {
    e.preventDefault();
    //Obteniendo valores
    const name = getInputVal('name');
    const email = getInputVal('email');
    const phone = getInputVal('phone');
    const subject = getInputVal('subject');
    const message = getInputVal('message');

    //Enviar formulari al correo
    sendEmail(email, subject, name, phone, message);

    //Limpiar formulario
    contacto.reset();
    //return false;
};

//Creando nodos del DOM: Lista de distritos
districts.forEach((district) => {
    const distrito = document.createElement('li');
    distrito.textContent = district;
    distrito.id = district;
    distrito.className = "dropdown-item";
    listDistricts.appendChild(distrito);
});


const mostrarResultados = (filterDistricts, districtName) => {
    districtsBtn.innerText = districtName;

    if (filterDistricts.length > 0) {
        showRecPoints(filterDistricts);
    } else {
        var noResults = `
        <p class="text-center">  No se encontraron resultados </p>
        <img class="mx-auto d-block" style="height: 300px" src="../images/not_found.png"> `;
        recCard.innerHTML = noResults;
    }
}

listDistricts.addEventListener('click', event => {
    const districtName = event.target.id;

    const filterDistricts = recPoints.filter(point => {
        if (point.district == districtName) {
            return point;
        }
    });

    switch (districtName) {
        case "Lince":
            mostrarResultados(filterDistricts, districtName);
            break;
        case "Miraflores":
            mostrarResultados(filterDistricts, districtName);
            break;
        default:
            mostrarResultados(filterDistricts, districtName);
            break;
    }
});


//Creando función para mostrar los resultados de búsqueda
const showRecPoints = (recPoints) => {

    if (districtsBtn.innerText.trim() == "Seleccionar distrito") {
        return recCard.innerHTML = `
        <p class="text-center">  Aqui verás los resultados  </p>
        <img class="mx-auto d-block" style="height: 300px; padding: 80px" src="../images/recycling-point.png"> 
        `
    }

    let puntosArr = recPoints.map(p => {
        return `
        <div class="card flex-row flex-wrap my-4"> 
            <div class="card-header border-0">
                <img src=${p.imgPath} c alt=${p.name}>
                </div>
                <div class="card-block p-4">
                <h4 class="card-ti">${p.name}</h4>
                <p>${p.address}</p>
                <p>${p.district}</p>
                <p>${p.province} ${p.department}</p>
                <p>${p.country}</p>
                <a href=${p.link} class="btn btn-primary">Ver en Google Maps</a>
            </div>
        </div>
           `;
    })

    puntosArr = puntosArr.join("");
    recCard.innerHTML = puntosArr;
}


//Agregando event handlers
reciclandCard.addEventListener('click', () => {
    document.getElementById('section-2').style.display = 'block';
    document.getElementById('section-1').style.display = 'none';
});

otraManeraCard.addEventListener('click', () => {
    document.getElementById('section-3').style.display = 'block';
    document.getElementById('section-1').style.display = 'none';
});

venARecogerCard.addEventListener('click', () => {
    document.getElementById('section-3').style.display = 'block';
    document.getElementById('section-1').style.display = 'none';
    document.getElementById('section-2').style.display = 'none';
});

puedoIrCard.addEventListener('click', () => {
    document.getElementById('section-4').style.display = 'block';
    document.getElementById('section-1').style.display = 'none';
    document.getElementById('section-2').style.display = 'none';
});

contacto.addEventListener("submit", submitForm);

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    showRecPoints(recPoints);
})