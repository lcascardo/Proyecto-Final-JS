// ------------------LLAMADO DE FUNCIONES-----------------------

fetch("./data/data.json")
    .then((res) => res.json())
    .then((data) => {
        crearCards(data);
        eventoBusqueda(data);
        eventoCategoria(data);
        eventoMarca(data);
        eventoPrecioMinMax(data);
        eventoResetearFiltro(data);
        logoCarrito();
    }
    );

renderizarCarrito();















