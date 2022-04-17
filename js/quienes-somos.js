var iconos = document.getElementsByClassName("img-fluid");

function desaparecer(e) {
    e.style.opacity = "0";
    e.style.transition = "opacity 2s linear";
}

function aparecer(e) {
    e.style.opacity = "1";
    e.style.transition = "visibility 0s 2s, opacity 2s linear";
}

for (var i = 0; i < iconos.length; i++) {
    iconos[i].setAttribute("onmouseover", "desaparecer(this)");
    iconos[i].setAttribute("onmouseout", "aparecer(this)");
}