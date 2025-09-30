 document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('solicitudForm');
            const feedbackMessage = document.getElementById('feedbackMessage');
            const submitButton = document.getElementById('enviarBtn');

            // Función para mostrar mensajes de retroalimentación
            function showFeedback(message, type) {
                feedbackMessage.textContent = message;
                feedbackMessage.className = `feedback-message ${type}`;
                feedbackMessage.style.display = 'block';
            }

            // Función para resetear los mensajes de retroalimentación
            function resetFeedback() {
                feedbackMessage.style.display = 'none';
                feedbackMessage.textContent = '';
                feedbackMessage.className = 'feedback-message';
            }

            form.addEventListener('submit', async (e) => {
                // Detenemos el envío normal del formulario
                e.preventDefault();
                resetFeedback();
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                // --- Lógica del usuario usando FormData ---
                const formData = new FormData(form);
                const data = {};

                // Convertimos FormData a un objeto plano, ignorando campos vacíos
                formData.forEach((value, key) => {
                    // Solo incluimos el valor si no está vacío, excepto para el teléfono que puede ser nulo en el payload final
                    if (value.trim() !== "" || key === "contactoTelefono") {
                        data[key] = value;
                    }
                });

                // Lógica para determinar el tipo de inmueble y el área solicitada
                let areaSolicitadaDetalle;
                let tipoInmueble;

                if (data.area_residencia) {
                    // Si se seleccionó un área de residencia (ej: sala)
                    tipoInmueble = "Casa/Departamento";
                    areaSolicitadaDetalle = data.area_residencia; 
                } else if (data.area_negocio) {
                    // Si se seleccionó un área de negocio (ej: barra)
                    tipoInmueble = "Negocio";
                    areaSolicitadaDetalle = data.area_negocio; 
                } else {
                    // Si no se seleccionó un área específica, usamos el campo principal (Interior/Exterior/Ambos)
                    tipoInmueble = "Pintura"; 
                    areaSolicitadaDetalle = data.areaSolicitada;
                }
                
                // Creamos la descripción adicional final
                let descripcionAdicional = data.descripcionAdicional || 'Sin detalles extra.';

                // Creamos el payload final que espera nuestro backend
                const finalPayload = {
                    nombre: data.nombre,
                    contactoEmail: data.contactoEmail,
                    contactoTelefono: data.contactoTelefono || 'No proporcionado',
                    tipoInmueble: tipoInmueble,
                    areaSolicitada: areaSolicitadaDetalle,
                    descripcionAdicional: descripcionAdicional,
                };
                
                // --- Fin de la lógica de recopilación de datos ---

                try {
                    // *** CONEXIÓN AL BACKEND ***
                    const response = await fetch('http://localhost:3000/api/solicitud', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(finalPayload),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        showFeedback(`✅ ¡Éxito! ${result.mensaje || 'Tu solicitud de pintura ha sido enviada.'} Pronto te contactaremos.`, 'success');
                        form.reset(); // Limpiar el formulario
                    } else {
                        // Error del servidor (ej: 400 Bad Request)
                        const errorMsg = result.error || 'Ocurrió un error en el servidor. Revisa los datos ingresados.';
                        showFeedback(`❌ Error: ${errorMsg}`, 'error');
                    }

                } catch (error) {
                    // Error de conexión (ej: servidor apagado)
                    console.error('Error de conexión:', error);
                    showFeedback('❌ Error de conexión: Asegúrate de que tu servidor Node.js esté funcionando en http://localhost:3000.', 'error');
                } finally {
                    // Restaurar botón
                    submitButton.disabled = false;
                    submitButton.textContent = 'Solicitar Presupuesto';
                }
            });
        });