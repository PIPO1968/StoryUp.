import React from 'react';
import { Link } from 'react-router-dom';
// ...aquí irá el sidebar fijo con links a todas las páginas...
export default function Sidebar() {
    const items = [
        { to: '/stories', icon: '📚', label: 'Historias' },
        { to: '/create-story', icon: '✍️', label: 'Crear Historia' },
        { to: '/news', icon: '📰', label: 'Noticias' },
        { to: '/statistics', icon: '📊', label: 'Estadísticas' },
        { to: '/contests-trophies', icon: '🏆', label: 'Concursos y Trofeos' }
    ];
    return (
        <aside style={{ position: 'fixed', top: 70, left: 0, width: 220, height: 'calc(100vh - 70px)', background: '#eaeaea', zIndex: 99 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', padding: 20, height: '100%', justifyContent: 'flex-start' }}>
                {items.map((item, idx) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#222',
                            marginBottom: 14,
                            background: '#fff',
                            borderRadius: 10,
                            boxShadow: '0 1px 6px #0001',
                            padding: '12px 0',
                            fontWeight: 500,
                            fontSize: '1rem',
                            transition: 'background 0.2s',
                        }}
                    >
                        <span style={{ fontSize: '1.4rem', marginBottom: 4 }}>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
                <Link
                    to="/profile"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#222',
                        marginTop: 18,
                        background: '#fff',
                        borderRadius: 10,
                        boxShadow: '0 1px 6px #0001',
                        padding: '12px 0',
                        fontWeight: 500,
                        fontSize: '1rem',
                        transition: 'background 0.2s',
                    }}
                >
                    <span style={{ fontSize: '1.4rem', marginBottom: 4 }}>👤</span>
                    Perfil
                </Link>
            </nav>
        </aside>
    );
}
