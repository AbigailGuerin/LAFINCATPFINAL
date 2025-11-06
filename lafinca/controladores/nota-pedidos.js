const urlLogin = "./api/login.php";
const urlRegistro = "./api/datos.php?tabla=clientes&accion=registrar";

// Variables del DOM
const frmLogin = document.querySelector("#form-login");
const divLogin = document.querySelector("#div-login");
const divLogout = document.querySelector("#div-logout");
const textoLogueado = document.querySelector("#texto-logueado");
const btnLogout = document.querySelector("#btn-logout");
const inputUsuario = document.querySelector("#usuario");
const inputPassword = document.querySelector("#password");

// Modal de registro
const frmRegistro = document.querySelector("#form-registro");

let usuario = "";
let usuario_id = "";
let logueado = false;

document.addEventListener("DOMContentLoaded", () => {
  verificar();
});

/**
 * LOGIN
 */
frmLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(frmLogin);
  login(datos);
});

const login = (datos) => {
  fetch(urlLogin, {
    method: "POST",
    body: datos,
  })
    .then(async (res) => {
      const text = await res.text(); // leer como texto
      try {
        const data = JSON.parse(text); // intentar parsear a JSON
        console.log("Respuesta del servidor:", data);

        // ✅ Cambiado: ahora valida según el formato real del PHP
        if (data.success && data.usuario) {
          usuario_id = data.id;
          usuario = data.usuario;
          logueado = true;

          sessionStorage.setItem("usuario", usuario);
          sessionStorage.setItem("usuario_id", usuario_id);
          verificar();
        } else {
          alert(data.message || "Usuario o contraseña incorrectos.");
        }
      } catch (e) {
        console.error("⚠️ Error: el servidor no devolvió JSON válido.");
        console.warn("Respuesta cruda:", text);
        alert("Error en el servidor al iniciar sesión. Revisa login.php.");
      }

      inputUsuario.value = "";
      inputPassword.value = "";
    })
    .catch((err) => console.error("Error en conexión:", err));
};

/**
 * REGISTRO
 */
frmRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(frmRegistro);

  fetch(urlRegistro, {
    method: "POST",
    body: datos,
  })
    .then(async (res) => {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        console.log("Respuesta del registro:", data);

        if (data.success) {
          alert("Registro exitoso. Ahora puedes iniciar sesión.");

          // Cerrar el modal correctamente (nombre del ID confirmado)
          const modal = bootstrap.Modal.getInstance(document.querySelector("#modalRegistro"));
          if (modal) modal.hide();

          frmRegistro.reset();
        } else {
          alert(data.message || "Error al registrar. Intenta nuevamente.");
        }
      } catch (e) {
        console.error("⚠️ Error: el servidor no devolvió JSON válido.");
        console.warn("Respuesta cruda:", text);
        alert("Error en el servidor al registrar. Revisa datos.php.");
      }
    })
    .catch((err) => console.error("Error en registro:", err));
});

/**
 * VERIFICAR LOGIN
 */
const verificar = () => {
  if (sessionStorage.getItem("usuario")) {
    usuario = sessionStorage.getItem("usuario");
    textoLogueado.innerHTML = `Bienvenido ${usuario}`;
    logueado = true;
  }

  if (logueado) {
    divLogin.classList.add("d-none");
    divLogout.classList.remove("d-none");
  } else {
    divLogin.classList.remove("d-none");
    divLogout.classList.add("d-none");
  }
};

/**
 * LOGOUT
 */
const logout = () => {
  logueado = false;
  textoLogueado.innerHTML = "";
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("usuario_id");
  verificar();
};

btnLogout.addEventListener("click", logout);