// db.js
const mongoose = require('mongoose');

// 1. Definición de la URI de Conexión
// **CORRECCIÓN:** La URL de Atlas debe estar encerrada en comillas simples (')
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://dubalcultca_db_user:Q587yBsaeyZVIF6m@cluster0.kzyym3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// 2. Definición del Esquema (Schema) para la solicitud
const solicitudSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    contactoEmail: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        trim: true,
        lowercase: true,
        // Usamos una RegEx básica para validar que sea un email
        match: [/\S+@\S+\.\S+/, 'Email no válido.'] 
    },
    contactoTelefono: {
        type: String,
        trim: true,
        default: 'No proporcionado'
    },
    tipoInmueble: { // Casa/Departamento o Negocio
        type: String,
        required: [true, 'El tipo de inmueble es obligatorio.']
    },
    areaSolicitada: { // Ej: sala, cocina, recepcion
        type: String,
        required: [true, 'El área a pintar es obligatoria.']
    },
    descripcionAdicional: {
        type: String,
        default: 'No se proporcionó descripción adicional.',
        trim: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// 3. Creación del Modelo
const Solicitud = mongoose.model('Solicitud', solicitudSchema);

// 4. Función de Conexión
const connectDB = async () => {
    try {
        // Usamos la URI para conectarnos
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Conectado con éxito.');
    } catch (err) {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        // Salir del proceso si hay un error fatal de DB
        process.exit(1); 
    }
};

module.exports = { connectDB, Solicitud };