const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
const uri = 'mongodb+srv://carregod98:Delich98@carregod.5s7xr.mongodb.net/misDatos?retryWrites=true&w=majority&appName=carregod';
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema y un modelo con Mongoose
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    edad: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Crear una ruta para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    try {
        const usuarioGuardado = await nuevoUsuario.save();
        res.status(201).json(usuarioGuardado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
