import {
  seleccionarPedidos,
  seleccionarDetallePedidos,
  seleccionarVistaPedidos,
  insertarPedidos,
  insertarDetallePedidos,
  actualizarDetalle_Pedido,
} from "../modelos/pedidos.js";
// Objetos del DOM
const listado = document.querySelector("#listado");
const alerta = document.querySelector("#alerta");
const spanUsuario = document.querySelector("#span-usuario");
const idPedidoSpan = document.querySelector("#id-pedido");
const totalSpan = document.querySelector("#total");

// Variables
let pedido_id = 0;
let pedidos = [];
let pedido = {};
let detallesPedido = [];
let detallePedido = {};
let vistaDetallesPedido = [];
let vistaDetallePedido = {};

let total = 0;

// Control de usuario
let usuario = "";
let usuario_id = "";
let logueado = false;

/**
 * Método que se ejecuta
 * cuando se carga la página
 */
document.addEventListener("DOMContentLoaded", async () => {
  controlUsuario();
  if (logueado) {
    pedidos = await obtenerPedidos();
    vistaDetallesPedido = await obtenerVistaDetallesPedidos();
    detallesPedido = await obtenerDetallesPedidos();
    mostrarPedidos();
  }
});

/**
 * Controla si el usuario está logueado
 */
const controlUsuario = () => {
  if (sessionStorage.getItem("usuario")) {
    usuario = sessionStorage.getItem("usuario");
    usuario_id = sessionStorage.getItem("usuario_id");
    spanUsuario.textContent = usuario;
    logueado = true;
  } else {
    logueado = false;
  }
  if (logueado) {
  } else {
  }
};

/**
 * Obtiene los pedidos del usuario
 */
async function obtenerPedidos() {
  pedido_id = localStorage.getItem("pedido_id");
  pedidos = await seleccionarPedidos();
  console.log(pedidos);
  return pedidos;
}

/**
 * Obtiene los detalles completos de los pedidos
 */
async function obtenerVistaDetallesPedidos() {
  pedido_id = localStorage.getItem("pedido_id");
  vistaDetallesPedido = await seleccionarVistaPedidos(pedido_id);
  console.log(vistaDetallesPedido);
  return vistaDetallesPedido;
}

/**
 * Obtiene los detalles de los pedidos
 */
async function obtenerDetallesPedidos() {
  pedido_id = localStorage.getItem("pedido_id");
  detallesPedido = await seleccionarVistaPedidos(pedido_id);
  console.log(detallesPedido);
  return detallesPedido;
}

/**
 * Muestra los pedidos en el DOM
 */
function mostrarPedidos() {
  idPedidoSpan.textContent = pedido_id;
  console.log(vistaDetallesPedido);
  if (vistaDetallesPedido.length > 0) {
    listado.innerHTML = "";
    vistaDetallesPedido.forEach((pedido) => {
      listado.innerHTML += `
                    <tr>
                        <td>${pedido.codigo}</td>
                        <td>${pedido.nombre}</td>
                        <td><input type="number" id="cantidad-${pedido.id}" value="${pedido.cantidad}" class="cantidad" /></td>
                        <td><span id="precio-${pedido.id}">${pedido.precio}</span> </td>
                        <td><span id="importe-${pedido.id}">${pedido.importe}</span> </td>
                    </tr>
                `;
      total += parseFloat(pedido.importe);
    });
    console.log(total);
    totalSpan.textContent = total.toFixed(2);
  }
}

/**
 * Función para determinar en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
  elemento.addEventListener(evento, (e) => {
    if (e.target.closest(selector)) {
      manejador(e);
    }
  });
};

/**
 * Función para la cantidad
 */
on(document, "change", ".cantidad", (e) => {
  e.preventDefault();
  const elemento = e.target;
  const id = elemento.id.split("-")[1];
  const cantidad = parseInt(elemento.value);
  console.log(id);
  console.log(cantidad);
  if (cantidad < 1) {
    elemento.value = 1;
    return;
  }
  // Actualizar el importe
  const precio = parseFloat(
    document.querySelector(`#precio-${id}`).textContent
  );
  const importe = cantidad * precio;
  document.querySelector(`#importe-${id}`).textContent = importe.toFixed(2);
  // Actualizar el detallePedido
  detallePedido = detallesPedido.find((detalle) => detalle.id == id);
  detallePedido.cantidad = cantidad;
  detallePedido.importe = importe;
  console.log(detallePedido);
  // Actualizar el total
  total = 0;
  detallesPedido.forEach((detalle) => {
    total += parseFloat(detalle.importe);
  });
  totalSpan.textContent = total.toFixed(2);
  // Actualizar en la base de datos
  actualizarDetalle_Pedido(detallePedido, id);
});
// ==============================
// BOTONES DE PAGO Y ELIMINAR
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const btnPagar = document.getElementById("btn-pagar");
  const btnEliminar = document.getElementById("btn-eliminar");
  const formPago = document.getElementById("formulario-pago");
  const form = document.getElementById("form-pago");
  const btnCancelar = document.getElementById("cancelar-pago");

  if (btnPagar) {
    // Mostrar formulario de pago
    btnPagar.addEventListener("click", () => {
      formPago.style.display = "block";
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }

  if (btnCancelar) {
    // Cancelar pago
    btnCancelar.addEventListener("click", () => {
      formPago.style.display = "none";
      form.reset();
    });
  }

 if (form) {
  // Confirmar pago
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const nombreTitular = document.getElementById("nombre-titular").value;
    const tipoTarjeta = document.getElementById("tipo").value;

    // Ocultamos el formulario
    formPago.style.display = "none";
    form.reset();

    // Mostramos el mensaje de éxito y el botón de imprimir
    const mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.style.display = "block";

    // Guardamos los datos necesarios para la factura
    localStorage.setItem("factura_nombre", nombreTitular);
    localStorage.setItem("factura_tipo", tipoTarjeta);
    localStorage.setItem("factura_total", total.toFixed(2));
    localStorage.setItem("factura_productos", JSON.stringify(vistaDetallesPedido));
  });
}
// ==============================
// IMPRIMIR FACTURA
// ==============================
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btn-imprimir") {
    const nombre = localStorage.getItem("factura_nombre");
    const tipo = localStorage.getItem("factura_tipo");
    const total = localStorage.getItem("factura_total");
    const productos = JSON.parse(localStorage.getItem("factura_productos")) || [];

    // Generamos contenido HTML para la factura
    let contenido = `
      <html>
      <head>
        <title>Factura - La Finca</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background-color: #f0f0f0; }
          .total { text-align: right; font-size: 1.2em; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Factura de compra</h1>
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Tipo de tarjeta:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
    `;

    productos.forEach(prod => {
      contenido += `
        <tr>
          <td>${prod.codigo}</td>
          <td>${prod.nombre}</td>
          <td>${prod.cantidad}</td>
          <td>${prod.precio}</td>
          <td>${prod.importe}</td>
        </tr>
      `;
    });

    contenido += `
          </tbody>
        </table>
        <p class="total"><strong>Total: $${total}</strong></p>
        <p style="text-align:center; margin-top:40px;">Gracias por su compra - La Finca 🏠</p>
      </body>
      </html>
    `;

    // Abrimos nueva ventana e imprimimos
    const ventana = window.open('', '_blank');
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
  }
});

  if (btnEliminar) {
  btnEliminar.addEventListener("click", async () => {
    const confirmar = confirm("¿Seguro que querés eliminar este pedido?");
    if (!confirmar) return;

    try {
      const pedido_id = localStorage.getItem("pedido_id");
      if (!pedido_id) {
        alert("No hay ningún pedido seleccionado.");
        return;
      }

      // 🔥 Llamada al backend para eliminar el pedido
      const respuesta = await fetch(`./api/datos.php?tabla=pedidos&accion=eliminar&id=${pedido_id}`);

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el pedido.");
      }

      const data = await respuesta.json();
      console.log("Respuesta del servidor:", data);

      // Borrar también el ID del pedido guardado en localStorage
      localStorage.removeItem("pedido_id");

      alert("🗑️ Pedido eliminado correctamente.");
      // Redirigimos al inicio o a productos
      window.location.href = "./productos.html";
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
      alert("❌ No se pudo eliminar el pedido.");
    }
  });
}
});