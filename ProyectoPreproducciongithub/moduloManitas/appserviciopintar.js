document.addEventListener('DOMContentLoaded', function() {

  // --- Selectores del Menú Lateral ---
  const botonAbrir = document.querySelector('.toggle-menu');
  const botonCerrar = document.querySelector('.cerrar-menu');
  const menu = document.getElementById('menuLateral');

  // --- Selectores del Submenú Desplegable ---
  const toggleTarifa = document.getElementById('toggle-tarifa');
  const sublista = document.getElementById('sublista');

  // Evento para abrir el menú lateral
  botonAbrir.addEventListener('click', () => {
    menu.classList.add('menu-abierto');
  });

  // Evento para cerrar el menú lateral
  botonCerrar.addEventListener('click', () => {
    menu.classList.remove('menu-abierto');
  });

  // Evento para el menú desplegable de "Tarifa por Servicios"
  // ¡Este es el código unificado!
  if (toggleTarifa && sublista) {
    toggleTarifa.addEventListener('click', function(event) {
      // Previene que la página navegue a '#'
      event.preventDefault(); 
      // Alterna la clase 'visible' en la sublista
      sublista.classList.toggle('visible');
    });
  }
// Manejo de botones (solicitar) para redirección con parámetros
const botones = document.querySelectorAll(".btnboton");

botones.forEach(boton => {
  boton.addEventListener("click", function() {
    const service = this.dataset.service;  // Obtiene el nombre del servicio
    const description = this.dataset.description;  // Obtiene la descripción del servicio
    const urlBase = this.dataset.url || "";  // Obtiene la URL base desde el atributo data-url del botón

    // Verifica si se ha proporcionado un atributo data-url, si no, asigna un valor predeterminado
    const url = `${urlBase}?service=${encodeURIComponent(service)}&description=${encodeURIComponent(description)}`;

    // Redirige a la URL generada
    window.location.href = url;
  });
});


  //console.log("appserviciopintar.js cargado correctamente");
});