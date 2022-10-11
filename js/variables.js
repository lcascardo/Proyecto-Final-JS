// ------------------VARIABLES-----------------------

const stockProductos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productosDiv = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");
const btnResetFiltro = document.getElementById("btn-reset-filtro");
