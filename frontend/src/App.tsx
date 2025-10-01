import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Biography from './components/Biography';
import District from './components/District';
import Proposals from './components/Proposals';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';
import AdminFab from './components/AdminFab';
import NewsPage from './components/NewsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsItem } from './types';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then(res => res.json())
      .then(setNews)
      .catch(() => setNews([]));
  }, [API_URL]);

  return (
    <>
      <Header />
      <Router>
        <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
          <main className="pt-16 flex-1">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <NewsSection news={news} />
                  <Biography />
                  <District />
                  <Proposals />
                  <Contact />
                </>
              } />
              <Route path="/news/:id" element={<NewsPage news={news} />} />
            </Routes>
          </main>
          <Footer />
          <AdminFab />
        </div>
      </Router>
    </>
  );
};

export default App;
