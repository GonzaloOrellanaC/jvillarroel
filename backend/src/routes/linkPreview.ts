import express from 'express';
import fetch from 'node-fetch';
import { load } from 'cheerio';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No url provided' });
  try {
    console.log(`[link-preview] Intentando obtener: ${url}`);
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) {
      console.error(`[link-preview] Error HTTP: ${response.status} ${response.statusText}`);
      return res.status(502).json({ error: `Error HTTP al obtener el recurso: ${response.status}` });
    }
    const html = await response.text();
    if (!html) {
      console.error('[link-preview] HTML vacío');
      return res.status(500).json({ error: 'No se pudo procesar el HTML para previsualización' });
    }
    let $;
    try {
      $ = load(html);
    } catch (err) {
      console.error('[link-preview] Error al cargar HTML en cheerio:', err);
      return res.status(500).json({ error: 'Error al analizar el HTML del enlace' });
    }
    // Buscar título
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    // Buscar imagen
    const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';
    // Buscar descripción
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    console.log(`[link-preview] Resultado:`, { title, image, description });
    res.json({ title, image, description });
  } catch (e) {
    console.error(`[link-preview] Error general:`, e);
    res.status(500).json({ error: 'No se pudo obtener la previsualización', details: e instanceof Error ? e.message : e });
  }
});

export default router;
