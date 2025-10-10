import React from 'react';
export default function CreateStory() {
    return (
        <div style={{ padding: 40, maxWidth: 600, margin: 'auto' }}>
            <h2>Crear Historia</h2>
            <form>
                <input type="text" placeholder="Título" required />
                <br /><br />
                <textarea placeholder="Escribe tu historia aquí..." rows={8} style={{ width: '100%' }} required />
                <br /><br />
                <label>
                    Modo:
                    <select>
                        <option>Real</option>
                        <option>Ficticia</option>
                    </select>
                </label>
                <br /><br />
                <label>
                    Tipo:
                    <select>
                        <option>Aventura</option>
                        <option>Terror</option>
                        <option>Corazón</option>
                        <option>Fantasía</option>
                        <option>Educativa</option>
                        <option>Concurso</option>
                    </select>
                </label>
                <br /><br />
                {/* Si es Concurso, mostrar campo para numeración/clave */}
                <button type="submit">Publicar</button>
            </form>
        </div>
    );
}
