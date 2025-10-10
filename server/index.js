const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: [
        'https://storyup-frontend.onrender.com',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());

// Middleware para permitir 'unsafe-eval' en scripts (React build)
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-eval' 'unsafe-inline' *; object-src 'self'");
    next();
});

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://pipocanarias_db_user:PaLMeRiTa1968@teamsoccer.a468utm.mongodb.net/storyup?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas base

const path = require('path');
const fs = require('fs');
const buildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API de StoryUp funcionando');
    });
}


// Modelo de usuario (colección 'usuarios')
const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    nick: String,
    email: String,
    password: String,
    tipo: String,
    fechaRegistro: Date,
    lastActive: Date,
    avatar: String, // URL o base64
    centroTipo: String,
    centroNombre: String
}, { collection: 'usuarios' });
const Usuario = mongoose.model('Usuario', userSchema);

// Endpoint: registro de usuario
app.post('/api/register', async (req, res) => {
    const { nombre, apellido, nick, email, password, tipo } = req.body;
    try {
        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ error: 'El email ya está registrado.' });
        const nuevo = new Usuario({
            nombre,
            apellido,
            nick,
            email,
            password, // En producción, encripta la contraseña
            tipo,
            fechaRegistro: new Date(),
            lastActive: new Date(),
            avatar: '',
            centroTipo: '',
            centroNombre: ''
        });
        await nuevo.save();
        res.json({ ok: true, usuario: nuevo });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar usuario.' });
    }
});

// Endpoint: login de usuario
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado.' });
        if (usuario.password !== password) return res.status(400).json({ error: 'Contraseña incorrecta.' });
        usuario.lastActive = new Date();
        await usuario.save();
        res.json({ ok: true, usuario });
    } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
});

// Endpoint: obtener perfil
app.get('/api/perfil/:email', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.params.email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.json({ ok: true, usuario });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener perfil.' });
    }
});

// Endpoint: actualizar perfil
app.put('/api/perfil/:email', async (req, res) => {
    try {
        const { nombre, apellido, nick, avatar, centroTipo, centroNombre } = req.body;
        const usuario = await Usuario.findOneAndUpdate(
            { email: req.params.email },
            { nombre, apellido, nick, avatar, centroTipo, centroNombre },
            { new: true }
        );
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
        res.json({ ok: true, usuario });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar perfil.' });
    }
});

// Endpoint: cantidad de usuarios y online
app.get('/api/status', async (req, res) => {
    try {
        const total = await Usuario.countDocuments();
        // Consideramos online si lastActive < 10 minutos
        const diezMin = new Date(Date.now() - 10 * 60 * 1000);
        const online = await Usuario.countDocuments({ lastActive: { $gte: diezMin } });
        res.json({ total, online });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener estado.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
