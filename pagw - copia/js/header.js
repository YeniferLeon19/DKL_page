document.getElementById("header-container").innerHTML = `


<header>

    <div class="logo">DarK Liquid</div>

    <nav class="nav-categorias">
        <a href="../html/index.html" class="category-card">TIENDA</a>
        <a href="../html/hombre.html" class="category-card">HOMBRE</a>
        <a href="../html/mujer.html" class="category-card">MUJER</a>
    </nav>

    <div class="search-container">

    <button class="search-btn" onclick="toggleSearch()">
        
    </button>

    <div class="search-bar" id="searchBar">
        <input type="text" placeholder="Buscar productos...">
    </div>

</div>


<a href="../html/carrito.html" class="cart-icon">
    <img src="../componentes/carrito.png" alt="Carrito" class="cart-img">

    <span class="cart-text">Carrito</span>

    <span id="contador">0</span>
</a>


</header>
`;