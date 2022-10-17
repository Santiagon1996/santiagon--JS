let precioFernet = 1750
let precioCerveza = 500
let precioVino = 1000
let precioDestilados = 2000
let carrito = Number("");
let compraTotal = Number("");
let volver=  ""

do {
    let estanteria = Number(prompt(`Ingrese una opcion : \n-1 Comprar vino: $` + precioVino + ` \n -2 Comprar cerveza: $` + precioCerveza + `\n -3 Comprar destilados: $` + precioDestilados + `\n -4 Fernet: $ ` + precioFernet + `\n -0 Volver al inicio \n -9 Volver a comprar: si/no `))
    if (estanteria == 1) {
        alert("Acaba de agregar la opcion Vino a su carrito")
        carrito = Number(prompt("El valor de su compra es de " + precioVino + " Cuantos articulos desea comprar?"))
        compraTotal = alert("Valor de compra es de " + precioVino + " con un valor de $ " + multiplicacion(carrito, precioVino))

    } else if (estanteria == 2) {
        alert("Acaba de agregar la opcion Cerveza a su carrito")
        carrito = Number(prompt("El valor de su compra es de " + precioCerveza + " Cuantos articulos desea comprar?"))
        compraTotal = alert("Valor de compra es de " + precioCerveza + " con un valor de $ " + multiplicacion(carrito, precioCerveza))

    } else if (estanteria == 3) {
        alert("Acaba de agregar la opcion Destilados a su carrito")
        carrito = Number(prompt("El valor de su compra es de " + precioDestilados + " Cuantos articulos desea comprar?"))
        compraTotal = alert("Valor de compra es de " + precioDestilados + " con un valor de $ " + multiplicacion(carrito, precioDestilados))

    } else if (estanteria == 4) {
        alert("Aacaba de agregar la opcion Fernet a su carrito")
        carrito = Number(prompt("El valor de su compra es de " + precioFernet + " Cuantos articulos desea comprar?"))
        compraTotal = alert("Valor de compra es de " + precioFernet + " con un valor de $ " + multiplicacion(carrito, precioFernet))
    } else if (estanteria ==0 ) {
      alert("Volver al inicio")
      break;
    } else if(estanteria==9){
         volver = prompt("Desea seguir comprando : \n -SI \n -NO")      
    }    
} while (volver !== "no");


function multiplicacion(numero1, numero2,) {
    let MultiEstanteria = numero1 * numero2
    return MultiEstanteria
}
