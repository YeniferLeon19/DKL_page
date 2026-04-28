let carrito = [];

// cargar carrito
function cargarCarrito() {
    let data = localStorage.getItem("carrito");

    if (data) {
        carrito = JSON.parse(data);
    }
}

// mostrar productos
function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button onclick="eliminarProducto(${index})">❌</button>
        `;

        lista.appendChild(li);

        suma += producto.precio;
    });

    total.textContent = suma;
}

// eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

// vaciar carrito
function vaciarCarrito() {
    carrito = [];

    localStorage.removeItem("carrito");

    mostrarCarrito();
}

// ejecutar al cargar
window.onload = function () {
    cargarCarrito();
    mostrarCarrito();
};

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("clicked");

        setTimeout(() => {
            btn.classList.remove("clicked");
        }, 300);
    });
});

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

