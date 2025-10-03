import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import News from '../models/News';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Auth middleware
function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}

// Crear noticia
router.post('/', auth, async (req: Request, res: Response) => {
  // Si el content-type es multipart/form-data, usar multer para archivos
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    const uploadMiddleware = upload.fields([
      { name: 'images', maxCount: 4 },
      { name: 'video', maxCount: 1 }
    ]);
    uploadMiddleware(req, res, async (err: any) => {
      if (err) return res.status(400).json({ message: 'Error al subir archivos' });
      const { text, type } = req.body;
      let images: string[] = [];
      let video: string | undefined;
      if (req.files && (req.files as any).images) {
        images = (req.files as any).images.map((f: any) => '/uploads/' + f.filename);
      }
      if (req.files && (req.files as any).video) {
        video = '/uploads/' + (req.files as any).video[0].filename;
      }
      const news = new News({ text, images, video, type });
      await news.save();
      res.json(news);
    });
  } else {
    // Si es JSON, aceptar imágenes y video como URLs
    // Extraer todos los campos posibles
    const {
      epigrafe,
      titular,
      bajada,
      lead,
      cuerpo,
      images = [],
      video,
      type,
      link,
      linkPreview
    } = req.body;

    // Construir objeto según tipo
    const newsData: any = {
      epigrafe,
      titular,
      bajada,
      lead,
      cuerpo,
      images,
      video,
      type
    };
    if (type === 'link') {
      newsData.link = link;
      if (linkPreview) newsData.linkPreview = linkPreview;
      else if (link) {
        // Intentar obtener metadata automáticamente
        try {
          const { getLinkPreviewMetadata } = await import('../utils/linkPreview');
          const meta = await getLinkPreviewMetadata(link);
          newsData.linkPreview = meta;
        } catch (err) {
          console.warn('[news] No se pudo obtener linkPreview automático:', err);
        }
      }
    }
    const news = new News(newsData);
    await news.save();
    res.json(news);
  }
});

// Listar noticias
router.get('/', async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// Like
router.post('/:id/like', async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'Noticia no encontrada' });
  news.likes++;
  await news.save();
  res.json({ likes: news.likes });
});

export default router;
