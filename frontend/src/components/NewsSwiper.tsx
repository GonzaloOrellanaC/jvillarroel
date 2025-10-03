import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { NewsItem } from '../types';
import NewsImageSwiper from './NewsImageSwiper';
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import LinkPreview from './LinkPreview';

interface Props {
  news: NewsItem[];
}

const NewsSwiper: React.FC<Props> = ({ news }) => {
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/i, '');
  const handleShare = useCallback(async (item: NewsItem) => {
    const shareUrl = `${apiBase}/share/news/${item._id}`;
    const shareTitle = item.titular || item.linkPreview?.title || 'Noticia';
    const shareText = item.bajada || item.lead || item.linkPreview?.description || '';
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        return;
      } catch (e) {
        // cancelado o error
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Enlace copiado al portapapeles');
    } catch {
      window.open(shareUrl, '_blank', 'noopener');
    }
  }, [apiBase]);

  return (
  <Swiper
    modules={[Navigation]}
    navigation
    breakpoints={{
      0: { slidesPerView: 1.5, spaceBetween: 16 },
      640: { slidesPerView: 2.5, spaceBetween: 20 },
      1024: { slidesPerView: 3.5, spaceBetween: 24 },
    }}
    className="py-8"
    dir="ltr"
    style={{ paddingLeft: 0, paddingRight: 0 }}
  >
    {news.map(item => (
      <SwiperSlide key={item._id}>
        {item.type !== 'link' ? (
          <Link to={`/news/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between hover:ring-2 hover:ring-blue-300 transition">
              <div className="mb-2">
                {item.epigrafe && <div className="text-xs text-blue-800 font-semibold uppercase mb-1">{item.epigrafe}</div>}
                {item.titular && <div className="text-lg font-bold text-blue-900 mb-1">{item.titular}</div>}
                {item.bajada && <div className="text-sm text-blue-700 mb-1">{item.bajada}</div>}
                {item.lead && <div className="text-sm text-gray-700 italic mb-1">{item.lead}</div>}
                {item.cuerpo && <div className="text-base text-gray-800 mb-1 line-clamp-3">{item.cuerpo}</div>}
              </div>
              {item.type === 'text_images' && item.images && item.images.length > 1 ? (
                <NewsImageSwiper images={item.images.map(img => img.startsWith('http') ? img : `${API_URL}${img}`)} />
              ) : item.type === 'text_images' && item.images && item.images.length === 1 ? (
                <img src={`${API_URL}${item.images[0]}`} alt="noticia" className="rounded w-full mb-2" style={{ minHeight: 300, maxHeight: 400, objectFit: 'contain' }} />
              ) : null}
              {item.type === 'text_video' && item.video && (
                <video controls className="w-full rounded mb-2 max-h-44">
                  <source src={item.video.startsWith('http') ? item.video : `${API_URL}${item.video}`} type="video/mp4" />
                  Tu navegador no soporta video.
                </video>
              )}
              <div className="text-xs text-gray-500 mt-2">{new Date(item.createdAt).toLocaleString()}</div>
              <div className="flex justify-end mt-2">
                <button onClick={(e) => { e.preventDefault(); handleShare(item); }} className="ml-2 px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-xs">Compartir</button>
              </div>
            </article>
          </Link>
        ) : (
          <article className="bg-white rounded-lg shadow p-4 h-full flex flex-col justify-between">
            {/* ...el renderizado de link ya existente... */}
            {item.type === 'link' && item.link ? (
              item.linkPreview ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block border rounded p-2 bg-gray-50 mb-2 hover:bg-gray-100 transition">
                  <div>
                    <div className="font-bold text-blue-900 text-sm line-clamp-1 mb-1">{item.linkPreview.title || item.link}</div>
                    <div className="text-xs text-gray-600 line-clamp-2 mb-2">{item.linkPreview.description}</div>
                    {item.linkPreview.image && (
                      <img src={item.linkPreview.image} alt="preview" className="rounded mx-auto" style={{ maxHeight: 300, width: 'auto', display: 'block', marginTop: 8 }} />
                    )}
                  </div>
                </a>
              ) : (
                <LinkPreview url={item.link} />
              )
            ) : null}
            <div className="text-xs text-gray-500 mt-2">{new Date(item.createdAt).toLocaleString()}</div>
            <div className="flex justify-end mt-2">
              <button onClick={() => handleShare(item)} className="ml-2 px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-xs">Compartir</button>
            </div>
          </article>
  )}
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default NewsSwiper;
