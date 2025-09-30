
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formulario").addEventListener("submit", function (e) {
    let valido = true;

    const campos = [
      {
        id: "Nombre",
        errorId: "error-nombre",
        validacion: valor => valor !== ""
      },
      {
        id: "Correo",
        errorId: "error-correo",
        validacion: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
        mensajeError: "Introduce un correo válido."
      },
      {
        id: "Movil",
        errorId: "error-movil",
        validacion: valor => /^\d{9}$/.test(valor),
        mensajeError: "Introduce solo 9 números."
      },
      {
        id: "servicio",
        errorId: "error-servicio",
        validacion: valor => valor !== ""
      },
      {
        id: "comentario",
        errorId: "error-comentario",
        validacion: valor => valor !== ""
      }
    ];

    campos.forEach(campo => {
      const valor = document.getElementById(campo.id).value.trim();
      const error = document.getElementById(campo.errorId);

      if (!campo.validacion(valor)) {
        error.textContent = campo.mensajeError || "Este campo es obligatorio.";
        error.style.display = "block";
        valido = false;
      } else {
        error.style.display = "none";
      }
    });

    if (!valido) e.preventDefault();
  });

  // Limita entrada a solo números en el campo móvil
  document.getElementById("Movil").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
});

