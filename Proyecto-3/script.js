let productos = [
    { id: 1, nombre: "6 vinos malbec", categoria: "promos",  stock: 15, precio: 1750, imgUrl: "./assets/promo-1.jpg" },    
    { id: 2, nombre: "6 vinos cabernet", categoria: "promos", stock: 30, precio: 1000, imgUrl: "./assets/promo-2.jpg" },
    { id: 3, nombre: "3 vinos blend",categoria: "promos", stock: 6, precio: 500, imgUrl: "./assets/promo-3.jpg" },
    { id: 4, nombre: "6 vinos mix", categoria: "promos", stock: 10, precio: 2000, imgUrl: "./assets/promo-4.jpg" }
];

let contenedorProductos = document.getElementById("contenedorProductos")
renderizarProductos()

//Busqueda por filtro
let inputBusqueda = document.getElementById("busqueda")
let botonBusqueda = document.getElementById("buscar")

 inputBusqueda.oninput = ( ) => {
     let productosFiltrados = productos.filter( producto => producto.nombre.includes(inputBusqueda.value))
     renderizarProductos(productosFiltrados)    
 }
function renderizarProductos(productosFiltrados) {
    let productosARenderizar = productos
    if (productosFiltrados){
        productosARenderizar = productosFiltrados

    }    
    contenedorProductos.innerHTML = " "
    for (const producto of productosARenderizar) {
        let tarjetaProducto = document.createElement("div");
        tarjetaProducto.className = "producto"
         tarjetaProducto.innerHTML =` 
         <img src=${producto.imgUrl}> 
         <h3> Producto: ${producto.nombre}</h3>
         <h4>$$${producto.precio}</h4>
         <p> Quedan: ${producto.stock} u.</p> 
         <button id=${producto.id}>Agregar al carrito</button>
            `
    
            contenedorProductos.append(tarjetaProducto)
    }  
}
let botones = document.getElementsByClassName("button")
let carrito = document.getElementById("carrito")

let carritoGuardado=[]
if(localStorage.getItem(`carrito`)){
    carritoGuardado = JSON.parse(localStorage.getItem(`carrito`))
}
for (const item of carritoGuardado) {
    console.log(item.nombre)
    let productoBuscado = productos.find(producto => producto.id == item.id)
    productoBuscado.className = "itemCarrito"
    productoBuscado.innerHTML =
        `<div class="itemCarrito>
             <p>${productoBuscado.nombre}</p>
             <p>${productoBuscado.precio}</p>
         </div>
     `
    carrito.append(productoBuscado)

    
}
for (const boton of botones) {
    boton.onclick = (e) => {
        let productoBuscado = productos.find(producto => producto.id == e.target.id)// no uso filter por que me devuelve el array con un produc
        productoBuscado.className = "itemCarrito"
        productoBuscado.innerHTML =
            `<div class="itemCarrito>
                 <p>${productoBuscado.nombre}</p>
                 <p>${productoBuscado.precio}</p>
             </div>
         `
        carrito.append(productoBuscado)

        carritoGuardado.push({id: productoBuscado.id, nombre: productoBuscado.nombre, precio: productoBuscado.precio})
        localStorage.setItem(`carrito`, JSON.stringify(carritoGuardado))
    }
}
