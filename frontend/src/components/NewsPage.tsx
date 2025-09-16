import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { NewsItem } from '../types';
const NEWS_API = `${import.meta.env.VITE_API_URL}`;

interface Props {
  news: NewsItem[];
}

const NewsPage: React.FC<Props> = ({ news }) => {
  const { id } = useParams<{ id: string }>();
  const item = news.find(n => n._id === id);

  if (!item) return <div className="p-8">Noticia no encontrada. <Link to="/">Volver</Link></div>;

  const shareUrl = `${window.location.origin}/news/${item._id}`;
  const shareTitle = item.titular || 'Noticia';
  const shareText = item.bajada || item.lead || item.cuerpo?.slice(0, 120) || '';
  const shareImage = item.images && item.images.length > 0 ? (item.images[0].startsWith('http') ? item.images[0] : `${NEWS_API}${item.images[0]}`) : undefined;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (e) {
        // cancelado o error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <>
      <Helmet>
        <title>{shareTitle}</title>
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareText} />
        <meta property="og:url" content={shareUrl} />
        {shareImage && <meta property="og:image" content={shareImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        {shareImage && <meta name="twitter:image" content={shareImage} />}
      </Helmet>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      {item.epigrafe && <div className="text-xs text-blue-800 font-semibold uppercase mb-1">{item.epigrafe}</div>}
      {item.titular && <div className="text-2xl font-bold text-blue-900 mb-2">{item.titular}</div>}
      {item.bajada && <div className="text-lg text-blue-700 mb-2">{item.bajada}</div>}
      {item.lead && <div className="text-base text-gray-700 italic mb-2">{item.lead}</div>}
      {item.cuerpo && <div className="text-base text-gray-800 mb-4 whitespace-pre-line">{item.cuerpo}</div>}
      {item.images && item.images.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-4">
          {item.images.map((img, i) => (
            <img key={i} src={img.startsWith('http') ? img : `${NEWS_API}${img}`} alt="noticia" className="rounded max-h-72" />
          ))}
        </div>
      )}
      {item.video && (
        <video controls className="w-full rounded mb-4 max-h-96">
          <source src={item.video.startsWith('http') ? item.video : `${NEWS_API}${item.video}`} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      )}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
        <button
          onClick={handleShare}
          className="ml-2 px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-xs"
          title="Compartir noticia"
        >
          Compartir
        </button>
      </div>
      <Link to="/" className="inline-block mt-4 text-blue-700 hover:underline">Volver</Link>
    </div>
    </>
  );
};

export default NewsPage;
