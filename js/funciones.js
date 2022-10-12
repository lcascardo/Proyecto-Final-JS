// ------------------FUNCIONES-----------------------

/* Crear Cards */
function crearCards(array) {
    productosDiv.innerHTML = ``;
    array.forEach(producto => {
        productosDiv.innerHTML += `<div class="card">
        <h3>${producto.nombre}</h3>
        <img src="./img/productos/${producto.img}">
        <p>$${producto.precio}</p>
        <button id="btnAgregarCarrito${producto.id}">Agregar</button>
        </div>`;
    })
    funcionBotonAgregar(array);
}

/* Funcion Agregar al Carrito */
function agregarAlCarrito(producto) {
    let existe = carrito.some(prod => prod.id === producto.id);
    if (existe === false) {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    else {
        let prodFind = carrito.find(prod => prod.id === producto.id);
        prodFind.cantidad++;
    }
    renderizarCarrito();
}

/* Funcion Renderizar Carrito */
function renderizarCarrito() {
    carritoDiv.innerHTML = `<p id="tituloCarrito">EL CARRITO ESTA VACIO. AGREGUE PRODUCTOS</p>`;
    carrito.forEach(prod => {
        carritoDiv.innerHTML += `<div class="carritoCard">
        <h3>${prod.nombre}</h3>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Precio: $${prod.precio}</p>
        <button id="btnBorrarCarrito${prod.id}">Borrar</button>
        <button id="btnBorrarUnoCarrito${prod.id}">-</button>
        </div>`;
    })

    carritoDiv.innerHTML += `<div class="carrito-total"><p>Total: $<span>${totalCarrito(carrito)}</span></p>
    <button id="btnFinalizarCompra">Comprar</button></div>`;
    carritoTitulo();
    activeBtnFinalizarCompra();
    btnFinalizarCompra();

    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarDelCarrito();
    borrarUnoDelCarrito();
}

/* Funcion Armar Array de Precios de Carrito */
function recorrerPrecios(array) {
    let precioCarrito = array.map((el) => {
        return el.precio * el.cantidad;
    })
    return precioCarrito || 0;
}


/* Funcion Calcular Total de Carrito */
function totalCarrito(array) {
    const acumular = (acc, num) => acc + num;
    let totalPrecioCarrito = recorrerPrecios(array);
    return totalPrecioCarrito.reduce(acumular, 0);
}

/* Funcion Deshabilitar Btn Finalizar Compra */
function activeBtnFinalizarCompra() {
    if (carrito == 0) {
        document.getElementById("btnFinalizarCompra").classList.add("activeBtnFinalizarCompra");
    }
}

/* Funcion Desabilitar Titulo Vacio de Carrito */
function carritoTitulo() {
    carrito.length !== 0 && document.getElementById("tituloCarrito").classList.add("disableEtiqueta");
}

/* Filtrar busqueda */
function filtrarNombre(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filtro);
    });
    return filtrado;
}

/* Filtrar array por propiedad categoria */
function filtrarCategoria(arr, filtro) {
    const filtrado = arr.filter(el => el.categoria.toLowerCase() === filtro.toLowerCase())
    return filtrado;
}

/* Filtrar array por propiedad marca */
function filtrarMarca(arr, filtro) {
    const filtrado = arr.filter(el => el.marca.toLowerCase() === filtro.toLowerCase())
    return filtrado;
}

/* Filtrar array por rango de precios */
function filtrarPrecio(arr, min, max) {
    const filtrado = arr.filter((el) => {
        return el.precio > min && el.precio < max
    })
    return filtrado;
}

/* Filtrar precio mayor que */
function filtrarMayorQue(arr, min) {
    const filtrado = arr.filter((el) => {
        return el.precio > min
    })
    return filtrado;
}

/* Filtrar precio menor que */
function filtrarMenorQue(arr, max) {
    const filtrado = arr.filter((el) => {
        return el.precio < max
    })
    return filtrado;
}

/* Funcion Boton Terminar Compra */
function btnTerminarCompra() {
    
    localStorage.clear();
    document.getElementById("contenedorProductos").classList.remove("finalizar-compra");
    document.getElementById("contenedorProductos").classList.add("compra-realizada");
    document.getElementById("contenedorProductos").innerHTML = `
    <h3>Gracias <span>${nombreUsuario.value + " " + apellidoUsuario.value}</span> por su compra</h3>
    <p>El pago se realizo correctamente</p>
    <p>Pagaste $<span>${totalCarrito(carrito)}</span> en <span>${cuotasUsuario.value + " " + "cuotas de:" + " " + totalCarrito(carrito) / cuotasUsuario.value}</span></p>
    <p>Enviaremos su recibo al mail: <span>${mailUsuario.value}</span></p>
    <a href="index.html">Volver a Tienda</a>`;
}