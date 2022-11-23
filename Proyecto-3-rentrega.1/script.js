let productos = [
    { id: 1, nombre: "6 vinos malbec", categoria: "promos", stock: 15, precio: 1750, imgUrl: "./assets/promo-1.jpg" },
    { id: 2, nombre: "6 vinos cabernet", categoria: "promos", stock: 30, precio: 1000, imgUrl: "./assets/promo-2.jpg" },
    { id: 3, nombre: "3 vinos blend", categoria: "promos", stock: 6, precio: 500, imgUrl: "./assets/promo-3.jpg" },
    { id: 4, nombre: "6 vinos mix", categoria: "promos", stock: 10, precio: 2000, imgUrl: "./assets/promo-4.jpg" }
];

let contenedorProductos = document.getElementById("contenedorProductos")

renderizarProductos()

let inputBusqueda = document.getElementById("busqueda")
let botonBusqueda = document.getElementById("buscar")

inputBusqueda.oninput = () => {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(inputBusqueda.value))
    renderizarProductos(productosFiltrados)
}

function renderizarProductos(productosFiltrados) {
    let productosARenderizar = productos
    if (productosFiltrados) {
        productosARenderizar = productosFiltrados

    }
    contenedorProductos.innerHTML = " "
    for (const producto of productosARenderizar) {
        let tarjetaProducto = document.createElement("div");
        tarjetaProducto.className = "producto"
        tarjetaProducto.innerHTML = ` 
         <img src=${producto.imgUrl}> 
         <h3> Producto: ${producto.nombre}</h3>
         <h4>$$${producto.precio}</h4>
         <p> Quedan: ${producto.stock} u.</p> 
         <button class="button" id=${producto.id}>Agregar al carrito</button>
            `

        contenedorProductos.append(tarjetaProducto)
    }
}

let botones = document.getElementsByClassName("button")
let carrito = document.getElementById("carrito")

let carritoGuardado = []
if (localStorage.getItem(`carrito`)) {
    carritoGuardado = JSON.parse(localStorage.getItem(`carrito`))
}

renderizarCarrito()

for (const boton of botones) {
    boton.onclick = (e) => {
        let productoBuscado = productos.find(producto => producto.id == e.target.id)

        let posicionProductoEnCarrito = carritoGuardado.findIndex(producto => producto.id == productoBuscado.id)

        if (posicionProductoEnCarrito != -1) {
            carritoGuardado[posicionProductoEnCarrito].unidades++
            carritoGuardado[posicionProductoEnCarrito].subtotal = carritoGuardado[posicionProductoEnCarrito].precioUnitario * carritoGuardado[posicionProductoEnCarrito].unidades
        } else {
            carritoGuardado.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio })
        }

        localStorage.setItem(`carrito`, JSON.stringify(carritoGuardado))

        renderizarCarrito()
    }
}

function renderizarCarrito() {
    carrito.innerHTML = `
        <div class= "itemCarrito">
            <p>nombre</p>
            <p>precioUnidad</p>
            <p>unidades</p>
            <p>subtotal</p>
        </div>
    `
    let total = 0
    for (const item of carritoGuardado) {
        total += item.subtotal
        carrito.innerHTML += `
            <div class= "itemCarrito">
                <p>${item.nombre}</p>
                <p>${item.precioUnitario}</p>
                <p>${item.unidades}</p>
                <p>${item.subtotal}</p>
            </div>
        `
    }
    carrito.innerHTML += `
        <div class= "itemCarrito">
            <h3>Total:${total}</h3>
        </div>
    `
}
