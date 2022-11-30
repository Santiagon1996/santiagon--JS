/*
=============== 
Funcion display productos estanteria
===============
*/

function productosUI(menu, id) {
  let productosMenu = document.getElementById(id);
  productosMenu.innerHTML = "";
  for (const producto of menu) {
    let boxDiv = document.createElement("div");
    boxDiv.classList.add("card");
    boxDiv.innerHTML = `
            <div class="col text-center  p-1 mb-1">
            <img src=${producto.img} class="card-img-top foto" alt="Menu item">
            <div class="card-body content">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.categoria}.</p>
              <p class="card-text">${producto.precio} $</p>
              <button href="#" id="${producto.id}" class="btn-compra">Comprar</button>
            </div>
            </div>`;
    mainSection.appendChild(boxDiv);
  }
  seleccionarItem();
}

fetch("javasCript/data.json")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((datos) => {
    for (const generico of datos) {
      menu.push(
        new Producto(
          generico.id,
          generico.nombre,
          generico.categoria,
          generico.precio,
          generico.img,
          generico.stock,
          generico.cantidad
        )
      );
    }
    productosUI(menu, "box-container");
  })
  .catch((mensaje) => {
    console.log(mensaje);
  });

/*
=============== 
Botones Filtro de productos
===============
*/

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    console.log(e.currentTarget.dataset);
    const categoria = e.currentTarget.dataset.id;
    console.log(categoria);
    const menuCategory = menu.filter(function (array) {
      if (array.categoria === categoria) {
        return array;
      }
    });
    if (categoria === "Todos") {
      return productosUI(menu, "box-container");
    } else {
      productosUI(menuCategory, "box-container");
    }
  });
});

/*
=============== 
Contenedor carrito
===============
*/

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("Carrito")) {
    carrito = JSON.parse(localStorage.getItem("Carrito"));
    actualizarCarrito();
  }
});

function seleccionarItem() {
  let botones = document.getElementsByClassName("btn-compra");
  for (const boton of botones) {
    boton.addEventListener("click", function () {
      let existe = carrito.find((producto) => producto.id == this.id);
      console.log(existe);
      if (existe) {
        existe.addCantidad();
      } else {
        existe = menu.find((producto) => producto.id == this.id);
        carrito.push(existe);
        console.log(carrito);
      }
      localStorage.setItem("Carrito", JSON.stringify(carrito));
      actualizarCarrito(carrito);
      Toastify({
        text: `Se ha agregado: ${existe.nombre} al carrito`,
        duration: 3000,
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, #943126, #fa8072)",
        },
      }).showToast();
    });
  }
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("tr");
    div.className = "prod-en-carrito";
    div.innerHTML = `
      
          <th scope="row">${prod.id}</th>
          <td >${prod.nombre}</td>
          <td>Cantidad: <span id="cantidad">${prod.cantidad}</span></td>
          <td>Precio:$${prod.precio}</td>
      
          
          <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
          `;
    contenedorCarrito.appendChild(div);
    localStorage.setItem("Carrito", JSON.stringify(carrito));
  });
  contadorCarrito.innerHTML = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0);
};

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  localStorage.removeItem("Carrito");
  actualizarCarrito();
});

const eliminarDelCarrito = (prodID) => {
  const item = carrito.find((prod) => prod.id === prodID);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
};

function vaciarCarrito() {
  localStorage.clear();
  carrito.splice(0, carrito.length);
  actualizarCarrito();
}

//Boton confirmar carrito
confirmar.onclick = () => {
  enviarDatos();
};

// Peticion GET fetch
peticion = fetch("https://reqres.in/api/unknown/2");

peticion.then((res) => res.json()).then((res) => console.log(res));

console.log(peticion);

// Peticion POST fetch
function enviarDatos(lista) {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    body: JSON.stringify({ carrito: lista, userID: 123 }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => {
      return res.json();
    })
    .then((datos) => {
      swal(`Tu nro de pedido es el  ${datos.id}! Ya lo estamos preparando!`, {
        icon: "success",
      });
      vaciarCarrito();
    })
    .catch((datos) => {
      swal("Tu pedido ha sido rechazado, saldo insuficiente!", {
        icon: "warning",
      });
    });
}

/*=============== 
Validacion formulario de boostrap
===============
*/

(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/*
=============== 
Boton rojo para scrolliar hacia arriba
===============
*/

let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



