document.getElementById("header-container").innerHTML = `

<header class="main-header">

    <div class="logo">DarK Liquid</div>

    <nav class="nav-categorias">
        <a href="../html/index.html">TIENDA</a>
        <a href="../html/hombre.html">HOMBRE</a>
        <a href="../html/mujer.html">MUJER</a>
    </nav>

    <div class="header-right">

        <div class="search-container">

            <button class="search-btn" onclick="toggleSearch()">
                <img src="../componentes/lupa.png" class="search-icon">
            </button>

            <div class="search-bar" id="searchBar">
                <input type="text" placeholder="Buscar productos...">
            </div>

        </div>

        <a href="../html/carrito.html" class="cart-icon">
            <img src="../componentes/carrito.png" class="cart-img">
            <span class="cart-text">Carrito</span>
            <span id="contador">0</span>
        </a>

    </div>

</header>
`;

function toggleSearch() {
    document.getElementById("searchBar").classList.toggle("active");
}
