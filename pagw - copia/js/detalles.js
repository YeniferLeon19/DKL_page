// HEADER DINÁMICO (scroll)
window.addEventListener("scroll", () => {
const header = document.querySelector("header");
header.classList.toggle("scrolled", window.scrollY > 50);
});


// EFECTO REVEAL (aparición al hacer scroll)
const revealElements = document.querySelectorAll(".card, .archive .text, .preview");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
    el.classList.add("show");
    }
});
};

window.addEventListener("scroll", revealOnScroll);


// CLICK EN BOTONES (feedback UX)
document.querySelectorAll(".btn").forEach(btn => {
btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.innerText = "LOADING...";
    
    setTimeout(() => {
    btn.innerText = "SHOP NOW";
    }, 1500);
});
});


// EFECTO HOVER DINÁMICO EN CARDS
document.querySelectorAll(".card").forEach(card => {
card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
    perspective(800px)
    rotateX(${-(y - rect.height / 2) / 20}deg)
    rotateY(${(x - rect.width / 2) / 20}deg)
    scale(1.03)
    `;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
});
});
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});


let carrito = [];

// cargar SIEMPRE al inicio
window.addEventListener("DOMContentLoaded", () => {
    let data = localStorage.getItem("carrito");

    if (data) {
        carrito = JSON.parse(data);
    }

    actualizarContador();
});

// actualizar numerito
function actualizarContador() {
    let contador = document.getElementById("contador");
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// agregar producto
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
}

function mostrarMenu(tipo) {
    const menu = document.getElementById("menu-desplegable");
    const contenido = document.getElementById("contenido-menu");

    menu.classList.remove("hidden");

    let html = "";

    if (tipo === "hombre") {
        html = `
            <div class="columna-menu">
                <h4>Hombre</h4>
                <a href="#">Camisas</a>
                <a href="#">Pantalones</a>
                <a href="#">Chaquetas</a>
            </div>
        `;
    }

    if (tipo === "mujer") {
        html = `
            <div class="columna-menu">
                <h4>Mujer</h4>
                <a href="#">Tops</a>
                <a href="#">Faldas</a>
                <a href="#">Vestidos</a>
            </div>
        `;
    }

    if (tipo === "accesorios") {
        html = `
            <div class="columna-menu">
                <h4>Accesorios</h4>
                <a href="#">Gorras</a>
                <a href="#">Bolsos</a>
                <a href="#">Cadenas</a>
            </div>
        `;
    }

    contenido.innerHTML = html;
}

document.addEventListener("click", function(e) {
    const menu = document.getElementById("menu-desplegable");

    if (!e.target.closest("nav") && !e.target.closest("#menu-desplegable")) {
        menu.classList.add("hidden");
    }
});

