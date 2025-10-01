import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth';
import newsRoutes from './routes/news';
import uploadRoutes from './routes/upload';
import linkPreviewRoutes from './routes/linkPreview';
import contactRouter from './routes/contact';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de React compilado
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Servir archivos subidos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/auth', authRoutes);
app.use('/news', newsRoutes);
app.use('/upload', uploadRoutes);
app.use('/link-preview', linkPreviewRoutes);
app.use('/contact', contactRouter);

// Fallback para SPA (React Router): cualquier ruta no encontrada devuelve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });


