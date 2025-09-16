# Jorge Diputado React Frontend

Este proyecto es una migración del frontend original a React + TypeScript usando Vite y Tailwind CSS.

## Estructura principal
- `src/App.tsx`: Componente principal.
- `src/components/`: Componentes modulares (Header, NewsSection, AdminFab, AdminPanel).
- `src/types.ts`: Tipos TypeScript para las noticias.
- `index.html`: Punto de entrada con Tailwind y React.

## Instalación
1. Instala dependencias:
   ```
npm install
   ```
2. Inicia el servidor de desarrollo:
   ```
npm run dev
   ```

## Notas
- El backend debe estar corriendo en `http://localhost:4000`.
- El ícono de Jorge debe estar en `public/jorge.png`.
- El login de admin y la gestión de noticias funcionan igual que en el frontend original.
