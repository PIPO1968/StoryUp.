import React from 'react';
export default function ContestsTrophies() {
    return (
        <div style={{ display: 'flex', padding: 40 }}>
            <div style={{ width: '60%', background: '#f9f9f9', padding: 20 }}>
                <h2>Concursos</h2>
                {/* Lista de concursos creados por Docentes */}
            </div>
            <div style={{ width: '40%', background: '#f0f0f0', padding: 20 }}>
                <h2>Trofeos</h2>
                {/* Lista de trofeos con imagen y detalle */}
            </div>
        </div>
    );
}
