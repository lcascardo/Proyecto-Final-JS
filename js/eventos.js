// ----------------EVENTOS-----------------

/* Seleccionar Boton Agregar al Carrito */
function funcionBotonAgregar(array) {
    array.forEach(producto => {
        document.getElementById(`btnAgregarCarrito${producto.id}`).addEventListener("click", () => {
            agregarAlCarrito(producto);
            Toastify({
                text: "AGREGASTE AL CARRITO: " + producto.nombre,
                duration: 4000
            }).showToast();
        })
    })
}

/* Evento Borrar Elemento Completo del Carrito */
function borrarDelCarrito() {
    carrito.forEach((producto => {
        document.getElementById(`btnBorrarCarrito${producto.id}`).addEventListener("click", () => {
            let indice = carrito.findIndex(el => el.id === producto.id);
            carrito.splice(indice, 1);
            renderizarCarrito();
            Toastify({
                text: "PRODUCTO ELIMINADO",
                style: {
                    background: "linear-gradient(to right, #E84242, #D80A0A)",
                },
                duration: 4000
            }).showToast();
        })
    }))
}

/* Evento Borrar un Elemento del Carrito */
function borrarUnoDelCarrito() {
    carrito.forEach((producto => {
        document.getElementById(`btnBorrarUnoCarrito${producto.id}`).addEventListener("click", () => {
            if (producto.cantidad === 1) {
                let indice = carrito.findIndex(el => el.id === producto.id);
                carrito.splice(indice, 1);
            }
            else {
                producto.cantidad--;
            }
            Toastify({
                text: "ELIMINASTE UN PRODUCTO",
                style: {
                    background: "linear-gradient(to right, #E84242, #D80A0A)",
                },
                duration: 4000
            }).showToast();
            renderizarCarrito();
        })
    }))
}

/* Evento Busqueda */
function eventoBusqueda(array) {
    const btnBuscador = document.getElementById("btnBuscadorProductos");
    const buscador = document.getElementById("buscadorProductos");
    btnBuscador.addEventListener("click", (e) => {
        e.preventDefault();
        let resultadoBusqueda = filtrarNombre(array, buscador.value.toLowerCase());
        crearCards(resultadoBusqueda);
    })
}

/* Evento de filtro por categoria */
function eventoCategoria(array) {
    const btnCategoria = document.getElementById("btn-categoria"),
        radioProcesador = document.getElementById("filtro-procesador"),
        radioPlaca = document.getElementById("filtro-placa"),
        radioMother = document.getElementById("filtro-mother"),
        radioGabinete = document.getElementById("filtro-gabinete");

    btnCategoria.addEventListener("click", (e) => {
        e.preventDefault();
        let resultado;
        if (radioProcesador.checked) {
            resultado = filtrarCategoria(array, "procesador");
        }
        else if (radioPlaca.checked) {
            resultado = filtrarCategoria(array, "placa de video");
        }
        else if (radioMother.checked) {
            resultado = filtrarCategoria(array, "motherboard");
        }
        else if (radioGabinete.checked) {
            resultado = filtrarCategoria(array, "gabinete");
        }
        else {
            resultado = array;
        }
        crearCards(resultado);
    })
}

/* Evento de filtro por marcas */
function eventoMarca(array) {
    const btnMarca = document.getElementById("btn-marca"),
        radioIntel = document.getElementById("filtro-intel"),
        radioAmd = document.getElementById("filtro-amd"),
        radioAsus = document.getElementById("filtro-asus"),
        radioMsi = document.getElementById("filtro-msi"),
        radioGigabyte = document.getElementById("filtro-gigabyte"),
        radioCoolerMaster = document.getElementById("filtro-cooler_master"),
        radioThermaltake = document.getElementById("filtro-thermaltake");

    btnMarca.addEventListener("click", (e) => {
        e.preventDefault();
        if (radioIntel.checked) {
            resultado = filtrarMarca(array, "intel");
        }
        else if (radioAmd.checked) {
            resultado = filtrarMarca(array, "amd");
        }
        else if (radioAsus.checked) {
            resultado = filtrarMarca(array, "asus");
        }
        else if (radioMsi.checked) {
            resultado = filtrarMarca(array, "msi");
        }
        else if (radioGigabyte.checked) {
            resultado = filtrarMarca(array, "gigabyte");
        }
        else if (radioCoolerMaster.checked) {
            resultado = filtrarMarca(array, "cooler master");
        }
        else if (radioThermaltake.checked) {
            resultado = filtrarMarca(array, "thermaltake");
        }
        else {
            resultado = array;
        }
        crearCards(resultado);
    })
}

/* Evento de filtro por precio */
function eventoPrecioMinMax(array) {
    const btnPrecio = document.getElementById("btn-precio"),
        precioMinimo = document.getElementById("precioMinimo"),
        precioMaximo = document.getElementById("precioMaximo");

    btnPrecio.addEventListener("click", (e) => {
        e.preventDefault();
        let resultado;
        if (precioMaximo.value == "") {
            resultado = filtrarMayorQue(array, precioMinimo.value);
        }
        else if (precioMinimo.value == "") {
            resultado = filtrarMenorQue(array, precioMaximo.value);
        }
        else if (precioMinimo.value == "" && precioMaximo.value == "") {
            resultado = array;
        }
        else {
            resultado = filtrarPrecio(array, precioMinimo.value, precioMaximo.value);
        }
        crearCards(resultado);
    })
}

/* Evento Boton Restear Filtro */
function eventoResetearFiltro(array) {
    btnResetFiltro.addEventListener("click", () => {
        crearCards(array);
    })
}

/* Evento Finalizar Compra */
function btnFinalizarCompra() {
    document.getElementById("btnFinalizarCompra").addEventListener("click", () => {
        document.getElementById("logoCarrito").classList.add("disableEtiqueta");
        document.getElementById("contenedorProductos").classList.remove("contenedor-productos");
        document.getElementById("contenedorProductos").classList.add("finalizar-compra");
        document.getElementById("contenedorProductos").innerHTML = ``;
        document.getElementById("formBuscador").innerHTML = ``;
        document.getElementById("contenedorProductos").innerHTML = `<h2>Finaliza tu compra</h2>
        <h3>Datos Personales (VALUES POR DEFECTO PARA NO TIPEAR)</h3>
        <form>
            <label for="nombreUsuario">Nombre</label>
            <input type="text" value="Lucas" id="nombreUsuario">
            <label for="apellidoUsuario">Apellido</label>
            <input type="text" value="Gomez" id="apellidoUsuario">
            <label for="mailUsuario">Email</label>
            <input type="email" value="lucasgomez@gmail.com" id="mailUsuario">
            <label for="telUsuario">Telefono</label>
            <input type="number" value="42256935" id="telUsuario">
            <label for="cuotasUsuario">Cuotas a Pagar</label>
            <select id="cuotasUsuario">
                <option value="1">1 cuota de $${totalCarrito(carrito)} </option>
                <option value="3">3 cuotas de $${totalCarrito(carrito) / 3}</option>
                <option value="6">6 cuotas de $${totalCarrito(carrito) / 6}</option>
                <option value="12">12 cuotas de $${totalCarrito(carrito) / 12}</option>
            </select>
        </form>

        <h3>Datos de Tarjeta de Credito</h3>
        <form>
            <label for="numTarjeta">Numero de tarjeta</label>
            <input type="number" value="4455356878981485" id="numTarjeta">
            <label for="nombreTarjeta">Nombre</label>
            <input type="text" value="GOMEZ LUCAS" id="nombreTarjeta">
            <h4>Vencimiento</h4>
            <label for="mesTarjeta">Mes</label>
            <input type="number" min="1" max="12" id="mesTarjeta" value="4">
            <label for="anioTarjeta">Año</label>
            <input type="number" id="anioTarjeta" value="2025">
            <label for="cvcTarjeta">CVC</label>
            <input type="number" value="452" id="cvcTarjeta">
        </form>
        <div><p id="errorForm"></p></div>
        <button id="btnTerminarCompra">Terminar Compra</button>
        `;
        validarFormulario();
    })
}

/* Evento Validar Formulario Datos */

function validarFormulario() {
    document.getElementById("btnTerminarCompra").addEventListener("click", () => {
        const nombre = document.getElementById("nombreUsuario");
        const apellido = document.getElementById("apellidoUsuario");
        const email = document.getElementById("mailUsuario");
        const telefono = document.getElementById("telUsuario");
        const numTarjeta = document.getElementById("numTarjeta");
        const nombreTarjeta = document.getElementById("nombreTarjeta");
        const mesTarjeta = document.getElementById("mesTarjeta");
        const anioTarjeta = document.getElementById("anioTarjeta");
        const cvcTarjeta = document.getElementById("cvcTarjeta");
        const error = document.getElementById("errorForm");
        error.classList.add("aviso-error");
        let mensajeError = [];

        if (nombre.value === null || nombre.value === "") {
            mensajeError.push("Ingresa tu nombre");
        }
        if (apellido.value === null || apellido.value === "") {
            mensajeError.push("Ingresa tu apellido");
        }
        if (email.value === null || email.value === "") {
            mensajeError.push("Ingresa tu mail");
        }
        if (telefono.value.length !== 8 ) {
            mensajeError.push("El telefono debe tener 8 digitos");
        }
        if (numTarjeta.value.length !== 16 ) {
            mensajeError.push("El numero de tarjeta debe tener 16 digitos");
        }
        if (nombreTarjeta.value === null || nombreTarjeta.value === "") {
            mensajeError.push("Ingresa tu nombre de la tarjeta");
        }
        if (mesTarjeta.value < 1 || mesTarjeta.value > 12) {
            mensajeError.push("Ingresa numero de mes del 1 al 12");
        }
        if (anioTarjeta.value.length !== 4) {
            mensajeError.push("Ingresa el año de vencimiento de la tarjeta con 4 digitos");
        }
        if (cvcTarjeta.value.length !== 3) {
            mensajeError.push("Ingresa el codigo de seguridad de 3 digitos");
        }

        error.innerText = mensajeError.join(" - ");

        mensajeError.length === 0 && btnTerminarCompra();
    })
}

/* Evento de Logo del Carrito */

function logoCarrito() {
    document.getElementById("logoCarrito").addEventListener("click", () => {
        document.getElementById("carrito").classList.toggle("moverCarrito");
    })
}