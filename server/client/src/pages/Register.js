import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [role, setRole] = useState('Alumno');
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [centroTipo, setCentroTipo] = useState('CEIP');
    const [centroNombre, setCentroNombre] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido, nick, email, password, tipo: role, centroTipo, centroNombre })
            });
            const data = await res.json();
            if (data.ok) {
                setMensaje('¡Registro exitoso!');
            } else {
                setMensaje(data.error || 'Error al registrar');
                if (data.error && data.error.includes('registrado')) {
                    setTimeout(() => navigate('/login'), 1500);
                }
            }
        } catch {
            setMensaje('No se pudo conectar al servidor');
        }
    };
    return (
        <div style={{ padding: 40, maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
            <img src="/logo-grande.png.png" alt="Logo StoryUp" style={{ width: 140, marginBottom: 18 }} />
            <h2>Registro</h2>
            <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
                <label>
                    <input type="radio" name="role" value="Docente" checked={role === 'Docente'} onChange={() => setRole('Docente')} /> Docente
                </label>
                <label style={{ marginLeft: 16 }}>
                    <input type="radio" name="role" value="Alumno" checked={role === 'Alumno'} onChange={() => setRole('Alumno')} /> Alumno
                </label>
                <br /><br />
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <br /><br />
                <input type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
                <br /><br />
                <input type="text" placeholder="Nick" value={nick} onChange={e => setNick(e.target.value)} required />
                <br /><br />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <br /><br />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                <br /><br />
                <label>Centro escolar:</label><br />
                <select value={centroTipo} onChange={e => setCentroTipo(e.target.value)}>
                    <option value="CEIP">CEIP</option>
                    <option value="IES">IES</option>
                </select>
                <input type="text" placeholder="Nombre del centro" value={centroNombre} onChange={e => setCentroNombre(e.target.value)} style={{ marginLeft: 10 }} />
                <br /><br />
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <div style={{ color: 'red', marginTop: 10 }}>{mensaje}</div>}
        </div>
    );
}
