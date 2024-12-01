// datos_login.js

// Función para guardar los datos de sesión en sessionStorage
function guardarDatosSesion(datos) {
    if (datos) {
        sessionStorage.setItem("sessionData", JSON.stringify(datos));
        console.log("Datos de sesión guardados:", datos);
    } else {
        console.error("No se proporcionaron datos para guardar en la sesión.");
    }
}

// Función para recuperar los datos de sesión desde sessionStorage
function obtenerDatosSesion() {
    const storedSession = sessionStorage.getItem("sessionData");
    if (storedSession) {
        const session = JSON.parse(storedSession);
        console.log("Datos de sesión recuperados:", session);
        return session;
    } else {
        console.warn("No hay datos de sesión guardados.");
        return null;
    }
}

// Función para borrar los datos de sesión (Cerrar sesión)
function cerrarSesion() {
    sessionStorage.removeItem("sessionData");
    console.log("Datos de sesión eliminados.");
    alert("Has cerrado sesión.");
    // Puedes redirigir al usuario a la página de inicio de sesión si es necesario
    // window.location.href = "login.html";
}

// Recuperar los datos de sesión y mostrar un mensaje de bienvenida
document.addEventListener("DOMContentLoaded", () => {
    const session = obtenerDatosSesion();
    if (session) {
        const mensajeBienvenida = document.getElementById("welcomeMessage");
        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `Bienvenido, ${session.Nombre}`;
        }
    }
});

// Vincular el botón de cerrar sesión
const botonCerrarSesion = document.getElementById("logoutButton");
if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", cerrarSesion);
}
