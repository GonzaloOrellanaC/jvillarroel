
import React from 'react';
import { NewsItem } from '../types';
import NewsSwiper from './NewsSwiper';

const NEWS_API = `${import.meta.env.VITE_API_URL}/news`;

interface Props {
  news: NewsItem[];
}

const NewsSection: React.FC<Props> = ({ news }) => {
  // Mostrar de más nueva a más antigua (izquierda a derecha)
  const sortedNews = [...news].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-900">Noticias</h2>
      <NewsSwiper news={sortedNews} />
    </section>
  );
};

export default NewsSection;
