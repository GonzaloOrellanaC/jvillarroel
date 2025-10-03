import express from 'express';
import News from '../models/News';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET /share/news/:id -> devuelve HTML con meta tags para social preview
router.get('/news/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findById(id).lean();
    if (!news) return res.status(404).send('Not found');

    // Determine scheme considering proxies (x-forwarded-proto) and env
    const forwardedProto = (req.headers['x-forwarded-proto'] as string) || '';
    const envBase = process.env.BASE_URL || '';
    let base = envBase || `${req.protocol}://${req.get('host')}`;
    // prefer x-forwarded-proto when present
    if (forwardedProto) {
      const host = req.get('host');
      base = `${forwardedProto}://${host}`;
    }

    // Fallback: prefer https if not explicitly http (helps crawlers)
    if (base.startsWith('http://') && !base.startsWith('https://')) {
      base = base.replace(/^http:\/\//, 'https://');
    }

    const title = news.linkPreview?.title || news.titular || news.epigrafe || 'Noticia';
    const description = news.linkPreview?.description || news.bajada || news.lead || '';
    let image = '';
    if (news.linkPreview?.image) image = news.linkPreview.image;
    else if (news.images && news.images.length) image = `${base}${news.images[0]}`;
    else image = `${base}/html/jorge.png`;

    // If an optimized OG image exists in the static html folder, prefer it
    try {
      const ogFile = path.join(__dirname, '../../html/jorge-og.jpg');
      if (fs.existsSync(ogFile)) {
        image = `${base}/html/jorge-og.jpg`;
      }
    } catch (e) {
      // ignore filesystem errors and keep existing image
    }

    // Ensure image and urls use https when possible (Twitter requires HTTPS images)
    if (image.startsWith('http://')) image = image.replace(/^http:\/\//, 'https://');

    // If an optimized OG image exists in the static html folder, prefer it
    try {
      const ogFile = path.join(__dirname, '../../html/jorge-og.jpg');
      if (fs.existsSync(ogFile)) {
        image = `${base}/jorge-og.jpg`;
      }
    } catch (e) {
      // ignore filesystem errors and keep existing image
    }

    // Ensure image and urls use https when possible (Twitter requires HTTPS images)
    if (image.startsWith('http://')) image = image.replace(/^http:\/\//, 'https://');

    const pageUrl = `${base}/share/news/${id}`;
    const canonical = `${base}/news/${id}`; // SPA route where the app shows the news

    const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${escapeHtml(pageUrl)}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta name="robots" content="index,follow" />
  </head>
  <body>
    <p>Redirigiendo a la noticia...</p>
    <script>
      // Después de que el scraper lea las meta tags, redirigimos al SPA
      setTimeout(function(){ window.location.href = '${canonical}'; }, 300);
    </script>
  </body>
</html>`;

    res.set('Content-Type', 'text/html');
    return res.send(html);
  } catch (err) {
    console.error('[shareNews] error', err);
    return res.status(500).send('Server error');
  }
});

function escapeHtml(str: any) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default router;
