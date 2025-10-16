const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware CORS (por si lo necesitas)
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Registro y login en el mismo endpoint
router.post('/', async (req, res) => {
    const { email, password, username, name, userType } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }
    const loginField = email;
    try {
        // Buscar usuario por email o username
        const user = await User.findOne({ $or: [{ email: loginField }, { username: loginField }] });
        if (user) {
            // LOGIN
            const isHashedPassword = user.password && user.password.startsWith('$2');
            let isValidPassword = false;
            if (isHashedPassword) {
                isValidPassword = await bcrypt.compare(password, user.password);
            } else {
                isValidPassword = password === user.password;
            }
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Credenciales incorrectas' });
            }
            const token = jwt.sign({
                userId: user._id,
                email: user.email,
                username: user.username
            }, process.env.JWT_SECRET || 'storyup-secret-key', { expiresIn: '7d' });
            return res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name || user.username,
                    avatar: user.avatar,
                    bio: user.bio,
                    userType: user.user_type || 'user',
                    school: user.school,
                    grade: user.grade,
                    followers: user.followers || 0,
                    following: user.following || 0,
                    isVerified: user.is_verified || false
                }
            });
        } else {
            // REGISTRO
            if (!username) return res.status(400).json({ error: 'Nombre de usuario (nick) es requerido' });
            if (!name) return res.status(400).json({ error: 'Nombre real es requerido' });
            if (!userType || (userType !== 'Usuario' && userType !== 'Padre/Docente')) {
                return res.status(400).json({ error: 'Debe seleccionar si es Usuario o Padre/Docente' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                username,
                password: hashedPassword,
                name,
                user_type: userType
            });
            await newUser.save();
            const token = jwt.sign({
                userId: newUser._id,
                email: newUser.email,
                username: newUser.username
            }, process.env.JWT_SECRET || 'storyup-secret-key', { expiresIn: '7d' });
            return res.json({
                token,
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    username: newUser.username,
                    name: newUser.name,
                    avatar: newUser.avatar,
                    bio: newUser.bio,
                    userType: newUser.user_type,
                    school: newUser.school,
                    grade: newUser.grade,
                    followers: newUser.followers,
                    following: newUser.following,
                    isVerified: newUser.is_verified
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

// Obtener perfil de usuario
router.get('/', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token de autorización requerido' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'storyup-secret-key');
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        return res.json({ user });
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
});

module.exports = router;
