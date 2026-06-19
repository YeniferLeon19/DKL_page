function filtrar(categoria) {
    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {
        if (categoria === "todos") {
            producto.style.display = "block";
        } else {
            if (producto.dataset.categoria === categoria) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }
        }
    });
}
