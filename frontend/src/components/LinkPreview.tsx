// Wrapper for @dhaiwat10/react-link-preview usage in AdminPanel
// Usage: <LinkPreview url={url} />

import React, { useEffect, useState } from 'react';

interface Props {
  url: string;
}

const LinkPreview: React.FC<Props> = ({ url }) => {
  const [data, setData] = useState<{ title?: string; image?: string; description?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url || !url.startsWith('http')) {
      setData(null);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    fetch('http://localhost:5012/link-preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(setData)
      .catch(() => setError('No se pudo cargar la previsualización.'))
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;
  if (loading) return <div style={{ fontSize: 12, color: '#888' }}>Cargando previsualización...</div>;
  if (error) return <div style={{ color: 'red', fontSize: 13 }}>{error}</div>;
  if (!data) return null;

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, marginTop: 8, display: 'flex', gap: 12, alignItems: 'center', background: '#fafafa' }}>
      {data.image && (
        <img src={data.image} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }} />
      )}
      <div>
        <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: 15 }}>{data.title}</div>
        <div style={{ fontSize: 13, color: '#555' }}>{data.description}</div>
      </div>
    </div>
  );
};

export default LinkPreview;
