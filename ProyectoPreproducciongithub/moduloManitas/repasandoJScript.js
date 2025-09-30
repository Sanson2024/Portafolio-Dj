// Seleccionar todos los botones con la clase "btnboton"
const botones = document.qauerySelectorAll (".btnboton");
// Agregar un evento de clic a cada botón   y función() para manejar el clic obtiene los datos con this.dataset.(atributo propiedad) previamente definido en html  y redirige a la URL generada
botones. addEventListener ("click", function(){
const service = this.datset.service
const description = this.dataset.description;
const urlBase = this.dataset.url  || "";

const url = `${urlBase}?service =${encodeURIComponent(service)}&description=${encodeURIComponent(descripción  )}`;

window.location.href = url;

});
