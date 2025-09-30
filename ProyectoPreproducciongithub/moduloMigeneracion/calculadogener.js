// Variable global para almacenar los resultados del cálculo
let resultadosCalculo = null;

const generaciones = [
  {
    nombre: "Generación Silenciosa",
    desde: 1928,
    hasta: 1945,
    descripcion: "Crecieron durante guerras y crisis económicas. Valoran la disciplina, el trabajo duro y la estabilidad.",
    espera: "Calidad, seguridad y atención personalizada.",
    redes: "Poca actividad digital; algunos usan Facebook.",
    imagen: "silenciosa.webp"
  },
  {
    nombre: "Baby Boomers",
    desde: 1946,
    hasta: 1964,
    descripcion: "Crecieron en tiempos de prosperidad. Valoran el trabajo estable y el éxito profesional.",
    espera: "Servicio confiable, buena atención y beneficios.",
    redes: "Facebook, WhatsApp.",
    imagen: "baby boomers.webp"
  },
  {
    nombre: "Generación X",
    desde: 1965,
    hasta: 1980,
    descripcion: "Vivieron el inicio de la era digital. Son independientes, adaptables y escépticos.",
    espera: "Flexibilidad, funcionalidad y buen precio.",
    redes: "Facebook, YouTube, LinkedIn.",
    imagen: "generacionx.webp"
  },
  {
    nombre: "Millennials",
    desde: 1981,
    hasta: 1996,
    descripcion: "Crecieron con internet. Valoran experiencias, autenticidad y propósito social.",
    espera: "Innovación, sostenibilidad y conexión emocional.",
    redes: "Instagram, TikTok, Twitter, YouTube.",
    imagen: "Millennials.webp"
  },
  {
    nombre: "Generación Z",
    desde: 1997,
    hasta: 2012,
    descripcion: "Nativos digitales. Creativos, visuales, sociales y muy conectados.",
    espera: "Inmediatez, personalización y contenido visual.",
    redes: "TikTok, Instagram, Snapchat, YouTube.",
    imagen: "z.webp"
  },
  {
    nombre: "Generación Alpha",
    desde: 2013,
    hasta: 2025,
    descripcion: "La primera generación 100% digital. Están creciendo con IA, realidad aumentada y pantallas táctiles.",
    espera: "Interactividad, tecnología intuitiva y experiencias inmersivas.",
    redes: "Aún no usan redes sociales ampliamente.",
    imagen: "alpha.webp"
  }
];

function calcularDatos() {
  const alias = document.getElementById("alias").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const pais = document.getElementById("pais").value;
  const fechaNacimientoInput = document.getElementById("fechaNacimiento").value;

  if (!fechaNacimientoInput) {
    alert("Por favor, introduce una fecha de nacimiento válida.");
    return;
  }

  const fechaNacimiento = new Date(fechaNacimientoInput);
  const anio = fechaNacimiento.getFullYear();
  const hoy = new Date();
  const edad = hoy.getFullYear() - anio;

  const generacion = generaciones.find(g => anio >= g.desde && anio <= g.hasta);
  const nombreGeneracion = generacion ? generacion.nombre : "Desconocida";
  const descripcionGeneracion = generacion ? generacion.descripcion : "No disponible.";
  const redesGeneracion = generacion ? generacion.redes : "No disponible.";

  let etapaActual = "";
  if (edad <= 12) etapaActual = "Niñez";
  else if (edad <= 19) etapaActual = "Adolescencia";
  else if (edad <= 64) etapaActual = "Adultez";
  else etapaActual = "Vejez";

  // Almacenamos los resultados en la variable global
  resultadosCalculo = {
    alias: alias,
    correo: correo,
    pais: pais,
    edad: edad,
    generacion: nombreGeneracion,
    etapa: etapaActual,
    descripcion: descripcionGeneracion,
    redes: redesGeneracion,
    imagen: generacion?.imagen
  };

  let html = `
    <div class="info">
      <p><strong>Alias:</strong> ${resultadosCalculo.alias || "Sin alias"}</p>
      <p><strong>Correo electrónico:</strong> ${resultadosCalculo.correo || "No proporcionado"}</p>
      <p><strong>Edad actual:</strong> ${resultadosCalculo.edad} años</p>
      <p><strong>Generación:</strong> ${resultadosCalculo.generacion}</p>
      <p><strong>Etapa actual:</strong> ${resultadosCalculo.etapa}</p>
  `;

  if (generacion) {
    html += `
        <p><strong>Descripción de la generación:</strong> ${resultadosCalculo.descripcion}</p>
        <p><strong>Qué espera esta generación de un producto o servicio:</strong> ${generacion.espera}</p>
        <p><strong>Redes sociales más usadas:</strong> ${resultadosCalculo.redes}</p>
      `;
  }

  html += `</div>`;

  if (resultadosCalculo.imagen) {
    html += `
      <div class="imagen-generacion">
        <img src="${resultadosCalculo.imagen}" alt="Imagen de la ${resultadosCalculo.generacion}">
      </div>
    `;
  }

  document.getElementById("resultado").innerHTML = html;
}

function limpiarFormulario() {
  document.getElementById("pais").selectedIndex = 0;
  document.getElementById("fechaNacimiento").value = "";
  document.getElementById("alias").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("resultado").innerHTML = "";
  // También limpiamos la variable global
  resultadosCalculo = null;
}

function enviarCorreo() {
  // Validamos si hay resultados para enviar y si se proporcionó un correo
  if (!resultadosCalculo || !resultadosCalculo.correo) {
    alert("Por favor, primero calcula los datos y asegúrate de ingresar un correo electrónico.");
    return;
  }

  // Prepara el asunto y el cuerpo del correo
  const asunto = `Resultado de la Calculadora Generacional`;
  
  let cuerpo = `Hola, soy ${resultadosCalculo.alias || "anónimo"}.\n\n`;
  cuerpo += `Aquí está mi perfil generacional:\n\n`;
  cuerpo += `País: ${resultadosCalculo.pais}\n`;
  cuerpo += `Edad: ${resultadosCalculo.edad} años\n`;
  cuerpo += `Generación: ${resultadosCalculo.generacion}\n`;
  cuerpo += `Etapa de vida: ${resultadosCalculo.etapa}\n`;

  if (resultadosCalculo.descripcion) {
    cuerpo += `\nDescripción: ${resultadosCalculo.descripcion}\n`;
    cuerpo += `Redes favoritas: ${resultadosCalculo.redes}\n`;
  }

  // Codifica los strings para la URL del enlace mailto
  const asuntoCodificado = encodeURIComponent(asunto);
  const cuerpoCodificado = encodeURIComponent(cuerpo);

  // Crea el enlace mailto y lo abre
  const mailtoURL = `mailto:${resultadosCalculo.correo}?subject=${asuntoCodificado}&body=${cuerpoCodificado}`;
  window.open(mailtoURL, '_blank');
}