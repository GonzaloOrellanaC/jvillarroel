import express from 'express';
import { getLinkPreviewMetadata } from '../utils/linkPreview';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No url provided' });
  try {
    const data = await getLinkPreviewMetadata(url);
    res.json(data);
  } catch (e) {
    console.error('[link-preview] Error general:', e);
    res.status(500).json({ error: 'No se pudo obtener la previsualización', details: e instanceof Error ? e.message : e });
  }
});

export default router;
