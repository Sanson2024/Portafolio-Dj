// server.js
const express = require('express');
const cors = require('cors'); // Para permitir la comunicación con el frontend
const { connectDB, Solicitud } = require('./db');
const { sendNotificationEmail } = require('./emailService');

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares Esenciales
// CORS: Necesario si el frontend corre en un puerto diferente (ej: 5500)
app.use(cors()); 
// Body Parser: Para que Express pueda leer los cuerpos JSON de las solicitudes POST
app.use(express.json()); 

// 2. Conexión a la Base de Datos
connectDB();

// 3. Endpoint POST Principal
app.post('/api/solicitud', async (req, res) => {
    // Los datos vienen del body de la solicitud HTTP (en formato JSON)
    const data = req.body;

    // Validación Básica (se puede hacer más robusta con librerías como Joi o Yup)
    if (!data.nombre || !data.contactoEmail || !data.tipoInmueble || !data.areaSolicitada) {
        return res.status(400).json({ 
            mensaje: 'Faltan campos obligatorios: Nombre, Email, Tipo de Inmueble y Área.' 
        });
    }

    try {
        // A. Guardar en la Base de Datos (Mongoose)
        const nuevaSolicitud = new Solicitud(data);
        const solicitudGuardada = await nuevaSolicitud.save();
        
        console.log('✅ Solicitud guardada en DB:', solicitudGuardada);

        // B. Enviar Notificación por Email (Nodemailer)
        // Le pasamos la solicitud guardada (que incluye el ID y el timestamp)
        await sendNotificationEmail(solicitudGuardada);
        
        // C. Respuesta Exitosa al Cliente (Frontend)
        res.status(200).json({ 
            mensaje: 'Solicitud procesada con éxito. Pronto te contactaremos.',
            solicitudId: solicitudGuardada._id 
        });

    } catch (error) {
        console.error('❌ Error en el procesamiento de la solicitud:', error);
        
        // Manejo de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
                mensaje: `Error de validación: ${messages.join(', ')}` 
            });
        }

        // Error interno del servidor
        res.status(500).json({ 
            mensaje: 'Error interno del servidor al procesar la solicitud.' 
        });
    }
});

// 4. Servidor a la escucha
app.listen(PORT, () => {
    console.log(`🔥 Servidor Express corriendo en http://localhost:${PORT}`);
    console.log('Esperando solicitudes en el endpoint /api/solicitud (POST)');
});