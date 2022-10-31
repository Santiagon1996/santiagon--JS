//ENTREGA N2

const bebidas = [
    { nombre: "Fernet", precio: 1750 },
    { nombre: "Cerveza", precio: 500 },
    { nombre: "Vino", precio: 1000 },
    { nombre: "Destilados", precio: 2000 }
]

let carritoDeCompra = []

let volver = ""

function multiplicacion(numero1, numero2,) {
    let MultiEstanteria = numero1 * numero2
    return MultiEstanteria
}

do {
    let estanteria = Number(prompt("Bienvenido a tu compras online de bebidas, desea comprar un producto, elija un numero 1 o 2 : \n 1) SI \n 2) NO "))
    if (estanteria != 1 && estanteria != 2) {
        alert("Ingrese una opcion valida ")
        estanteria = Number(prompt("Bienvenido a tu compras online de bebidas, desea comprar un producto, elija un numero 1 o 2 : \n 1) SI \n 2) NO"))
    }
    else if (estanteria == 1) {
        alert("A continuacion nuestra lista de bebidas")
        let misBebidas = bebidas.map((bebida) => bebida.nombre + " " + bebida.precio + "$")
        alert(misBebidas.join(" / "))
        while (estanteria != 2) {
            let bebida = prompt("Agrega una bebida a tu compra!!")
            let precio = 0
            if (bebida == "fernet" || bebida == "cerveza" || bebida == "vino" || bebida == "destilados") {
                switch (bebida) {
                    case "fernet":
                        precio = 1750
                        break
                    case "cerveza":
                        precio = 500
                        break
                    case "vino":
                        precio = 1000
                        break
                    case "destilados":
                        precio = 2000
                        break
                    default:
                        break
                }
                let cantidad = Number(prompt("Cuantas unidades quiere adquirir"))
                carritoDeCompra.push({ bebida, cantidad, precio })
            } else {
                alert("No encontrasmos el producto dentro de nuestra estanteria")
            }
            estanteria = Number(prompt("Quiere agregar alguna bebida mas? \n Elija un numero 1 o 2 : \n 1) SI \n 2) NO"))
            while (estanteria == 2) {
                alert("Gracias por sus compras, hasta la proxima")
                carritoDeCompra.map((compraFinal) => {
                    alert(`Bebida: ${compraFinal.bebida}, unidades: ${compraFinal.cantidad}, total: ${multiplicacion(compraFinal.cantidad, compraFinal.precio)}`)
                })
                break
            }

        }
    } else if (estanteria == 2) {
        volver = prompt("Desea seguir comprando : \n -SI \n -NO")
    }
} while (volver !== "no") {
    alert("Gracias por su visita, hasta la proxima")
}

const total = carritoDeCompra.reduce((acc, el) => acc + multiplicacion(el.precio, el.cantidad), 0)
console.log(`Su total a pagar es de ${total}`)

