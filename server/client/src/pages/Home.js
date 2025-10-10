import React from 'react';
export default function Home() {
    return (
        <div style={{ padding: 40, maxWidth: 1000, margin: '40px 0 40px 60px', background: '#f8f9fa', borderRadius: 16, boxShadow: '0 2px 12px #0001', float: 'left' }}>
            {/* Bloque superior: texto de bienvenida y logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <h1 style={{ fontSize: '2.2rem', marginBottom: 10 }}>¡Bienvenido a StoryUp.es!</h1>
                    <h2 style={{ fontWeight: 400, color: '#555', marginBottom: 0 }}>Tu red social educativa para crear, compartir y aprender</h2>
                </div>
                <div style={{ minWidth: 140, textAlign: 'center' }}>
                    <img src="/logo-grande.png.png" alt="Logo StoryUp" style={{ width: 140, marginLeft: 18 }} />
                </div>
            </div>
            {/* Bloques informativos en filas de tres columnas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: 18 }}>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>📚</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Crea Historias</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Desarrolla tu creatividad escribiendo historias únicas y compártelas con la comunidad educativa.</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>👥</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Comunidad</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Conecta con estudiantes, padres y docentes. Aprende y enseña en un entorno seguro y colaborativo.</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>🏆</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Logros</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Consigue trofeos y reconocimientos por tu participación y creatividad en la plataforma.</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>📊</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Estadísticas</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Sigue tu progreso y el de tu clase con estadísticas detalladas de aprendizaje.</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>💬</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Chat</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Comunícate de forma segura con tu clase y profesores a través de nuestro sistema de mensajería.</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: '16px 10px', minWidth: 0 }}>
                    <span style={{ fontSize: '1.5rem', marginBottom: 6 }}>📰</span>
                    <b style={{ fontSize: '1rem', marginBottom: 4, display: 'block' }}>Noticias</b>
                    <span style={{ color: '#666', fontSize: '0.95rem' }}>Mantente al día con las últimas noticias y actividades de tu centro educativo.</span>
                </div>
            </div>
            {/* Botones de registro y login */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginTop: 32 }}>
                <a href="/register" style={{ background: '#007bff', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 6px #0001', transition: 'background 0.2s' }}>Registrarse</a>
                <a href="/login" style={{ background: '#28a745', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 6px #0001', transition: 'background 0.2s' }}>Iniciar sesión</a>
            </div>
        </div>
    );
}
