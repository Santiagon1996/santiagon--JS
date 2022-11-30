class Producto {
    constructor(id, nombre, categoria, precio, url, stock, cantidad) {
      this.id = parseInt(id);
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = parseFloat(precio);
      this.img = url;
      this.stock = stock;
      this.cantidad = cantidad || 1;
    }
  
    addCantidad() {
      this.cantidad++;
    }
  }