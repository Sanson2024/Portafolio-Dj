document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formComentario');
    const lista = document.getElementById('listaComentarios');

    // Cargar comentarios guardados
    let comentarios = JSON.parse(localStorage.getItem('comentariosBlogManitas')) || [];
    renderComentarios();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        if (!nombre || !mensaje) return;

        const nuevoComentario = { nombre, mensaje, fecha: new Date().toLocaleString() };
        comentarios.push(nuevoComentario);
        localStorage.setItem('comentariosBlogManitas', JSON.stringify(comentarios));
        renderComentarios();
        form.reset();
    });

    function renderComentarios() {
        lista.innerHTML = '';
        if (comentarios.length === 0) {
            lista.innerHTML = '<p>¡Sé el primero en comentar!</p>';
            return;
        }
        comentarios.forEach(com => {
            const div = document.createElement('div');
            div.className = 'comentario';
            div.innerHTML = `
                <span class="comentario-nombre">${com.nombre}</span> <span style="font-size:0.85em;color:#888;">${com.fecha}</span>
                <div class="comentario-mensaje">${com.mensaje}</div>
            `;
            lista.appendChild(div);
        });
    }
});
