let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function agregarAlCarrito(nombre, precio) {

    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

localStorage.setItem("carrito", JSON.stringify(carrito));

actualizarContador();

}
// mostrar productos
function mostrarCarrito() {

    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total");

    if (!lista || !total) return;

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
    actualizarContador();
}

// vaciar carrito
function vaciarCarrito() {
    carrito = [];

    localStorage.removeItem("carrito");

    mostrarCarrito();
    actualizarContador();
}

// ejecutar al cargar
window.onload = function () {

    mostrarCarrito();

    actualizarContador();
};

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("clicked");

        setTimeout(() => {
            btn.classList.remove("clicked");
        }, 300);
    });
});


function actualizarContador() {

    const contador = document.getElementById("contador");

    if (contador) {

        contador.textContent = carrito.length;

    }
}