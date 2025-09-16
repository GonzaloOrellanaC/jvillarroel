# Prompt para desarrollo backend y frontend

## Backend (Node.js + TypeScript + MongoDB)

1. **Crea un proyecto Node.js con TypeScript.**
2. **Instala dependencias:** express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, multer (para subir imágenes/videos), y sus tipos.
3. **Configura conexión a MongoDB** usando mongoose.
4. **Define modelos:**
   - Usuario (solo admin, con email y password hasheado).
   - Noticia (post): campos para texto, array de imágenes (máx 4), video (opcional), likes (array de userId o solo contador), fecha, y campo para saber si es solo texto.
5. **Endpoints REST:**
   - `POST /auth/login` (admin): retorna JWT.
   - `POST /news` (solo admin, autenticado): crear noticia (texto, imágenes, video).
   - `GET /news`: lista de noticias ordenadas por fecha.
   - `POST /news/:id/like`: suma un like (no requiere autenticación).
6. **Middleware de autenticación** para rutas protegidas.
7. **Soporte para subida de imágenes y videos** (multer, guardando rutas en MongoDB).
8. **Permite compartir noticias:** genera endpoint para obtener la URL pública de la noticia.

## Frontend (cambios a tu HTML/CSS/JS)

1. **Agrega una sección de noticias** justo debajo del mensaje de presentación del diputado.
2. **Cada noticia debe mostrar:**
   - Texto, imágenes (máx 4 en grid), o video (embed), según el tipo.
   - Botón de like (solo uno por usuario por sesión, usando localStorage).
   - Botón para compartir (usa Web Share API si está disponible, o copia el link).
   - Contador de likes.
3. **Estilo dinámico:** usa las clases y colores existentes (azul, amarillo, blanco, sombras, bordes redondeados).
4. **Carga las noticias desde el backend** usando fetch a `/news`.
5. **Al dar like:** actualiza el contador en frontend y backend, deshabilita el botón para ese usuario.
6. **No requiere login para ver ni dar like.**
7. **Admin:** agrega un panel (puede ser una ruta oculta o modal) para loguearse y crear noticias (texto, imágenes, video).

### Ejemplo de estructura de noticia en frontend

```html
<div class="card p-6 mb-6 bg-white rounded-lg shadow-lg fade-in">
  <p class="text-gray-800 mb-4">Texto de la noticia...</p>
  <!-- Si hay imágenes -->
  <div class="grid grid-cols-2 gap-2 mb-4">
    <img src="..." class="rounded" />
    <!-- hasta 4 imágenes -->
  </div>
  <!-- Si hay video -->
  <video controls class="w-full rounded mb-4">
    <source src="..." type="video/mp4" />
  </video>
  <div class="flex items-center justify-between">
    <button class="like-btn bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded hover:bg-yellow-600 transition">👍 Like (<span>12</span>)</button>
    <button class="share-btn bg-blue-800 text-white font-bold px-4 py-2 rounded hover:bg-blue-900 transition">Compartir</button>
  </div>
</div>
```

### Notas adicionales

- El backend debe validar el tipo de contenido (solo texto, texto+video, texto+fotos).
- El frontend debe mostrar las noticias más recientes primero.
- El sistema debe ser responsivo y mantener la estética actual.
- El panel de admin puede ser simple, solo para agregar noticias.
