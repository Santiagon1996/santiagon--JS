let productos = [
    { id: 1, nombre: "6 vinos malbec", categoria: "promos", stock: 15, precio: 1750, imgUrl: "./assets/promo-1.jpg" },
    { id: 2, nombre: "6 vinos cabernet", categoria: "promos", stock: 30, precio: 1000, imgUrl: "./assets/promo-2.jpg" },
    { id: 3, nombre: "3 vinos blend", categoria: "promos", stock: 0, precio: 500, imgUrl: "./assets/promo-3.jpg" },
    { id: 4, nombre: "6 vinos mix", categoria: "promos", stock: 10, precio: 2000, imgUrl: "./assets/promo-4.jpg" },
    { id: 5, nombre: "combo fernet", categoria: "combo", stock: 7, precio: 3300, imgUrl: "./assets/combo-1.jpg" },
    { id: 6, nombre: "combo beefeeter", categoria: "combo", stock: 9, precio: 4200, imgUrl: "./assets/combo-2.jpg" },
    { id: 7, nombre: "combo absolut", categoria: "combo", stock: 18, precio: 3500, imgUrl: "./assets/combo-absolut.jpg" },
    { id: 8, nombre: "combo aperol-spritz", categoria: "combo", stock: 22, precio: 4000, imgUrl: "./assets/combo-4.webp" },
    { id: 9, nombre: "zorro salvaje malbec", categoria: "mas vendido", stock: 3, precio: 1000, imgUrl: "./assets/zorro-malbec.jpeg" },
    { id: 10, nombre: "la posta rose", categoria: "mas vendido", stock: 5, precio: 2500, imgUrl: "./assets/laposta.rose.jpg" },
    { id: 11, nombre: "portillo sb", categoria: "mas vendido", stock: 23, precio: 2200, imgUrl: "./assets/portilli.sb.jpeg" },
    { id: 12, nombre: "la linda malbec", categoria: "mas vendido", stock: 12, precio: 1150, imgUrl: "./assets/linda-malbec.jpg" },
];

// const construcFetch = async () => {
//     const response = await fetch(`./productos.json`)
//     const productos = await response.json()
//     renderizarProductos(productos)
// }
// construcFetch()

//fetch('./productos.json')
//.then(response => response.json())
//.then(arrayProductos => renderizarProductos(arrayProductos))

//DOM/ JSON
let contenedorProductos = document.getElementById("contenedorProductos")
let inputBusqueda = document.getElementById("busqueda")
let botonBusqueda = document.getElementById("buscar")
let botones = document.getElementsByClassName("button")
let carrito = document.getElementById("carrito")
let carritoGuardado = JSON.parse(localStorage.getItem(`carrito`)) || []
let btnCarrito = document.getElementById("btnCarrito")


renderizarProductos()

// EVENTOS
inputBusqueda.oninput = () => {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(inputBusqueda.value))
    renderizarProductos(productosFiltrados)
}
btnCarrito.onclick = () => {
    carrito.classList.toggle("noVisible")
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


        Toastify({
            text: "Se agrego al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { }
        }).showToast()

        localStorage.setItem(`carrito`, JSON.stringify(carritoGuardado))

        renderizarCarrito()
    }
}

//FUNCIONES
function renderizarProductos(productosFiltrados) {
    let productosARenderizar = productos
    if (productosFiltrados) {
        productosARenderizar = productosFiltrados
    }

    contenedorProductos.innerHTML = " "
    for (const { imgUrl, nombre, precio, stock, id } of productosARenderizar) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "conteiner"
        tarjetaProducto.innerHTML = `
    <div class="conteiner contenedor-tarjetas">
        <div class="row conteiner-row">
            <div class="col-12 col-md-4 conteiner-productos">
                <div class="card" style="width: 18rem;">
                    <img src= ${imgUrl} class="card-img-top" alt="...">
                    <div class="card-body">
                            <h5 class="card-title">Producto: ${nombre}</h5>
                            <h4>$$${precio}</h4>
                            <p class="card-text">Quedan: ${stock > 0 ? stock : "No hay stock"} u.</p>
                            <button class="button btn btn-primary" id=${id}>Agregar al carrito</button>
                    </div>  
                </div>
            </div>
        </div>
    </div>`
        contenedorProductos.append(tarjetaProducto)
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

