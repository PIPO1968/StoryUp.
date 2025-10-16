import React, { useEffect, useState } from 'react';

export default function Stories() {
    const [historias, setHistorias] = useState([]);
    const [comentariosVisibles, setComentariosVisibles] = useState({}); // { [id]: boolean }
    const [nuevoComentario, setNuevoComentario] = useState({}); // { [id]: texto }
    const [comentarios, setComentarios] = useState({}); // { [id]: [comentarios] }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/api/historias')
            .then(res => res.json())
            .then(data => setHistorias(data))
            .catch(() => setHistorias([]));
    }, []);

    const mostrarComentarios = async (id) => {
        setLoading(true);
        setComentariosVisibles(v => ({ ...v, [id]: !v[id] }));
        if (!comentarios[id]) {
            // Cargar comentarios solo si no están cargados
            const res = await fetch(process.env.REACT_APP_API_URL + `/api/historias/${id}/comentarios`);
            const data = await res.json();
            setComentarios(c => ({ ...c, [id]: data }));
        }
        setLoading(false);
    };

    const enviarComentario = async (id) => {
        if (!nuevoComentario[id]) return;
        setLoading(true);
        const res = await fetch(process.env.REACT_APP_API_URL + `/api/historias/${id}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: nuevoComentario[id] })
        });
        if (res.ok) {
            const data = await res.json();
            setComentarios(c => ({ ...c, [id]: [...(c[id] || []), data] }));
            setNuevoComentario(n => ({ ...n, [id]: '' }));
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Historias</h2>
            {historias.length === 0 && <p>No hay historias disponibles.</p>}
            {historias.map(historia => (
                <div key={historia._id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px #0001', padding: 18, marginBottom: 24 }}>
                    <h3>{historia.titulo}</h3>
                    <p>{historia.texto}</p>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <span>👤 {historia.usuario?.nick || historia.usuario}</span>
                        <span>🗓️ {new Date(historia.fecha).toLocaleDateString()}</span>
                        <button onClick={() => mostrarComentarios(historia._id)} style={{ marginLeft: 12 }}>
                            💬 Comentarios
                        </button>
                        {/* Aquí iría el botón de likes si existe */}
                    </div>
                    {comentariosVisibles[historia._id] && (
                        <div style={{ marginTop: 18, background: '#f9f9f9', borderRadius: 8, padding: 12 }}>
                            <h4>Comentarios</h4>
                            {loading && <p>Cargando...</p>}
                            <form onSubmit={e => { e.preventDefault(); enviarComentario(historia._id); }} style={{ marginBottom: 12 }}>
                                <input
                                    type="text"
                                    placeholder="Escribe un comentario..."
                                    value={nuevoComentario[historia._id] || ''}
                                    onChange={e => setNuevoComentario(n => ({ ...n, [historia._id]: e.target.value }))}
                                    style={{ width: '80%', marginRight: 8 }}
                                    required
                                />
                                <button type="submit">Publicar</button>
                            </form>
                            {(comentarios[historia._id] && comentarios[historia._id].length > 0) ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {comentarios[historia._id].map((c, idx) => (
                                        <li key={idx} style={{ marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
                                            <b>{c.usuario?.nick || c.usuario}</b> <span style={{ color: '#888', fontSize: '0.9em' }}>{new Date(c.fecha).toLocaleString()}</span>
                                            <div>{c.texto}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>No hay comentarios aún.</p>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
