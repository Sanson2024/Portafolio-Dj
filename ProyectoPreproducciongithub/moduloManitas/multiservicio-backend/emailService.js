const nodemailer = require('nodemailer');

// 1. Configuración del transportador de correo (Usando Mailtrap para pruebas)
// NOTA: Mailtrap simula el envío de correo.
const transporter = nodemailer.createTransport({
    // ⚠️ VALORES REALES DE MAILTRAP (Extraídos de tu código de prueba)
    host: 'sandbox.smtp.mailtrap.io', 
    port: 2525,               
    secure: false,            // Es false para el puerto 2525
    auth: {
        // USUARIO: El token de usuario de Mailtrap
        user: '7870ca71f2fac3', 
        // CONTRASEÑA: La contraseña/token que te da Mailtrap
        pass: 'fb944c3d4d4ac9' 
    }
});

// 2. Función para enviar el correo de notificación
const sendNotificationEmail = async (solicitud) => {
    // 3. Define el contenido del correo
    const mailOptions = {
        // Remitente (puede ser cualquier email de prueba)
        from: 'info@tuproyecto.com',
        // Destinatario (el correo que usarás en la solicitud POST)
        to: solicitud.contactoEmail, 
        subject: `Nueva Solicitud de ${solicitud.nombre} - ${solicitud.tipoInmueble}`,
        html: `
            <h1>Nueva Solicitud de Servicio Recibida</h1>
            <p><strong>Nombre:</strong> ${solicitud.nombre}</p>
            <p><strong>Email del Contacto:</strong> ${solicitud.contactoEmail}</p>
            <p><strong>Teléfono:</strong> ${solicitud.contactoTelefono}</p>
            <p><strong>Tipo de Inmueble:</strong> ${solicitud.tipoInmueble}</p>
            <p><strong>Área Solicitada:</strong> ${solicitud.areaSolicitada}</p>
            <p><strong>Descripción Adicional:</strong> ${solicitud.descripcionAdicional}</p>
            <p><strong>ID de Solicitud (Guardada en DB):</strong> ${solicitud._id}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✉️ Correo de notificación enviado con éxito a Mailtrap.');
    } catch (error) {
        console.error('❌ Error al enviar el correo con Nodemailer:', error.message);
    }
};

module.exports = { sendNotificationEmail };
