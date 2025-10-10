import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [mensaje, setMensaje] = React.useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.ok) {
                setMensaje('¡Login exitoso!');
                setTimeout(() => navigate('/perfil'), 1200);
            } else {
                setMensaje(data.error || 'Error al iniciar sesión');
            }
        } catch {
            setMensaje('No se pudo conectar al servidor');
        }
    };
    return (
        <div style={{ padding: 40, maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
            <img src="/logo-grande.png.png" alt="Logo StoryUp" style={{ width: 120, marginBottom: 16 }} />
            <h2>Iniciar sesión</h2>
            <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <br /><br />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                <br /><br />
                <button type="submit">Entrar</button>
            </form>
            {mensaje && <div style={{ color: 'red', marginTop: 10 }}>{mensaje}</div>}
        </div>
    );
}
