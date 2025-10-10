- [ ] Verificar que el archivo copilot-instructions.md en el directorio .github está creado.
- [ ] Aclarar requisitos del proyecto
- [ ] Crear el scaffolding del proyecto
- [ ] Personalizar el proyecto
- [ ] Instalar extensiones necesarias (si aplica)
- [ ] Compilar el proyecto
- [ ] Crear y ejecutar tarea (si aplica)
- [ ] Lanzar el proyecto
- [ ] Verificar documentación completa

Trabajar sistemáticamente cada punto y actualizar este archivo conforme se avanza.

---
## Despliegue del backend en Render

1. Verifica que la carpeta `server` contiene `package.json` y el punto de entrada es `index.js`.
2. Sube el proyecto a un repositorio en GitHub.
3. Entra a https://dashboard.render.com y crea un nuevo servicio Web Service.
4. Conecta tu cuenta de GitHub y selecciona el repositorio y la carpeta del backend (`server`).
5. Configura:
	- Build Command: `npm install`
	- Start Command: `node index.js`
	- Node.js environment
6. Agrega variables de entorno necesarias (ejemplo: `MONGO_URI` para MongoDB Atlas).
7. Render desplegará y te dará una URL pública para tu backend.
8. Prueba los endpoints usando Postman o el frontend.

Actualiza este archivo conforme avances con el despliegue y verifica que todo funcione correctamente.

---
## Despliegue del frontend en Render

1. Verifica que la carpeta `client` contiene el build de React (`public`, `src`, `package.json`).
2. Asegúrate de que las llamadas al backend usan la URL pública de Render (por ejemplo, `https://storyup-backend.onrender.com/api/...`).
3. Sube la carpeta `client` al repositorio de GitHub si no lo has hecho.
4. Entra a https://dashboard.render.com y crea un nuevo servicio Static Site.
5. Selecciona el repositorio y la carpeta del frontend (`client`).
6. Configura:
	- Build Command: `npm install && npm run build`
	- Publish Directory: `build`
7. Agrega variables de entorno si usas REACT_APP_API_URL:
	- `REACT_APP_API_URL=https://storyup-backend.onrender.com`
8. Render desplegará y te dará una URL pública para tu frontend.
9. Accede y verifica que el frontend se comunica correctamente con el backend online.