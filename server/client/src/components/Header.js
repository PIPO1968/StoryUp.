import React, { useEffect, useState } from 'react';
// ...aquí irá el header fijo con favicon, usuarios, online, fecha/hora y selector de idioma...
export default function Header() {
    // Simulación de datos
    const [usuarios, setUsuarios] = useState(0);
    const [online, setOnline] = useState(0);
    const [fechaHora, setFechaHora] = useState('');
    const [idioma, setIdioma] = useState('Español');
    const [logueado, setLogueado] = useState(false); // Cambia a true si el usuario está logueado

    // Actualizar fecha y hora cada segundo (hora de Canarias)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Hora de Canarias = UTC
            const canarias = new Date(now.toLocaleString('en-US', { timeZone: 'Atlantic/Canary' }));
            const fecha = canarias.toLocaleDateString('es-ES');
            const hora = canarias.toLocaleTimeString('es-ES');
            setFechaHora(`${fecha} ${hora}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Obtener usuarios y online reales del backend
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/status`);
                const data = await res.json();
                setUsuarios(data.total);
                setOnline(data.online);
            } catch (err) {
                setUsuarios(0);
                setOnline(0);
            }
        };
        fetchStatus();
        const interval = setInterval(fetchStatus, 10000); // Actualiza cada 10s
        return () => clearInterval(interval);
    }, []);

    // Simulación de login/logout
    const handleLogout = () => {
        setLogueado(false);
        // Aquí iría la lógica real de logout
    };

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 70, background: '#f5f5f5', zIndex: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 20px' }}>
                <img src="/favicon.ico" alt="favicon" style={{ width: 32, height: 32, marginRight: 16 }} />
                <select style={{ marginRight: 18 }} value={idioma} onChange={e => setIdioma(e.target.value)}>
                    <option>Español</option>
                    <option>Inglés</option>
                    <option>Francés</option>
                    <option>Alemán</option>
                    <option>Chino</option>
                </select>
                <span style={{ marginLeft: 16 }}>Usuarios: {usuarios}</span>
                <span style={{ marginLeft: 16 }}>Online: {online}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>{fechaHora}</span>
                {logueado && (
                    <button style={{ marginLeft: 'auto', background: '#e74c3c', color: '#fff', fontWeight: 600, borderRadius: 6, padding: '8px 18px', border: 'none', cursor: 'pointer' }} onClick={handleLogout}>Cerrar sesión</button>
                )}
            </div>
        </header>
    );
}
