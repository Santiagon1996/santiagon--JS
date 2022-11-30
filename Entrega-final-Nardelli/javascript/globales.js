// VARIABLES DE ACCESO GLOBAL
// Display Menu
const menu = [];
let carrito = [];
// Elementos Padres Display Menu
const mainSection = document.querySelector(".box-container");
const btnContainer = document.querySelector(".btn-container");
// Elementos botones del menu
const filterBtns = document.querySelectorAll(".filter-btn");
// Elementos del carrito
const botonVaciar = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
let currentItem = 0;
// Sweet Alert
const confirmar = document.getElementById("confirmar");
