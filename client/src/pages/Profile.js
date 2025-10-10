import React, { useState, useEffect } from 'react';
export default function Profile() {
    // Simulación de datos del usuario (en producción, obtener de backend)
    const [avatar, setAvatar] = useState(null);
    const [usuario, setUsuario] = useState({ nombre: '', nick: '', email: '', centroTipo: '', centroNombre: '' });
    // Simulación: obtener email del usuario logueado
    const email = localStorage.getItem('email') || 'juanp@example.com';

    useEffect(() => {
        fetch(`http://localhost:5000/api/perfil/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setUsuario(data.usuario);
                    setAvatar(data.usuario.avatar || null);
                }
            });
    }, [email]);

    const handleAvatar = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setAvatar(reader.result);
                await fetch(`http://localhost:5000/api/perfil/${email}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        nick: usuario.nick,
                        avatar: reader.result,
                        centroTipo: usuario.centroTipo,
                        centroNombre: usuario.centroNombre
                    })
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 40 }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '60%', minWidth: 300, background: '#f9f9f9', padding: 20 }}>
                    <h3>Avatar</h3>
                    <input type="file" accept="image/*" onChange={handleAvatar} />
                    {avatar && <img src={avatar} alt="avatar" style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }} />}
                    <h3 style={{ marginTop: 30 }}>Datos personales</h3>
                    <div><b>Nombre completo:</b> {usuario.nombre}</div>
                    <div><b>Nick:</b> {usuario.nick}</div>
                    <div><b>Email:</b> {usuario.email}</div>
                    <div style={{ marginTop: 20 }}>
                        <b>Centro escolar:</b> {usuario.centroTipo ? `${usuario.centroTipo}: ${usuario.centroNombre}` : ''}
                    </div>
                </div>
                <div style={{ width: '40%', minWidth: 200, background: '#f0f0f0', padding: 20 }}>
                    <h3>Trofeos</h3>
                    {/* Trofeos del usuario */}
                </div>
            </div>
            <div style={{ width: '100%', background: '#e0e0e0', padding: 20, marginTop: 20 }}>
                <h3>Chat privado</h3>
                {/* Chat privado */}
            </div>
            {/* Si es Docente, mostrar bloques de Noticias, Concursos y Panel de Administración aquí */}
        </div>
    );
