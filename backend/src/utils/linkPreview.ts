import fetch from 'node-fetch';
import { load } from 'cheerio';

export async function getLinkPreviewMetadata(url: string) {
  if (!url) return { title: '', image: '', description: '' };
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const html = await response.text();
  const $ = load(html);
  const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
  const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';
  const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
  return { title, image, description };
}
