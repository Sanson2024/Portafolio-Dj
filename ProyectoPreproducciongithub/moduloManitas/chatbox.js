function toggleChatbox() {
    const chatbox = document.getElementById('chatbox-servicios');
    chatbox.classList.toggle('open');
}

function enviarPregunta(event) {
    event.preventDefault();
    const input = document.getElementById('chat-input');
    const mensajes = document.getElementById('chat-mensajes');
    const pregunta = input.value.trim();
    if (!pregunta) return;

    // Mostrar pregunta del usuario
    const userMsg = document.createElement('div');
    userMsg.style = "margin-bottom:4px;text-align:right;color:#007ACC;";
    userMsg.textContent = pregunta;
    mensajes.appendChild(userMsg);

    // Simular respuesta automática
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.style = "margin-bottom:8px;text-align:left;color:#222;background:#e6f7ff;padding:4px 8px;border-radius:6px;display:inline-block;";
        botMsg.textContent = obtenerRespuesta(pregunta);
        mensajes.appendChild(botMsg);
        mensajes.scrollTop = mensajes.scrollHeight;
    }, 600);

    input.value = '';
    mensajes.scrollTop = mensajes.scrollHeight;
}

function obtenerRespuesta(pregunta) {
    // Respuestas básicas simuladas
    const texto = pregunta.toLowerCase();
    if (texto.includes('pintar')) return 'Ofrecemos servicios de pintura interior y exterior. ¿Qué necesitas pintar?';
    if (texto.includes('presupuesto')) return 'Puedes solicitar un presupuesto desde el menú principal o aquí mismo.';
    if (texto.includes('horario')) return 'Trabajamos de lunes a sábado de 8:00 a 20:00.';
    if (texto.includes('precio') || texto.includes('tarifa')) return 'Las tarifas varían según el servicio. ¿Sobre qué servicio deseas información?';
    if (texto.includes('contacto')) return 'Puedes contactarnos por este chat o desde la sección de contacto.';
    return '¡Gracias por tu pregunta! Un asesor te responderá pronto.';
}

// Abrir el chatbox por defecto en pantallas pequeñas
window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 600) {
        document.getElementById('chatbox-servicios').classList.add('open');
    }
});
