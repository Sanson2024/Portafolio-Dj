document.addEventListener('DOMContentLoaded', function(){
    // Elimina el evento anterior del botón si ya no lo necesitas
    // document.getElementById('mostrarTextoBtn').addEventListener(...);

    // Asume que hay 6 imágenes y 6 mensajes
    for (let i = 1; i <= 6; i++) {
        const img = document.getElementById('img' + i);
        if (img) {
            img.addEventListener('click', function() {
                const mensaje = document.getElementById('mensaje' + i);
                if (mensaje) {
                    mensaje.classList.toggle("mostrarTexto");
                }
            });
        }
    }
});





