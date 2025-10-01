import React, { useRef, useEffect, useState } from 'react';
import { PhotoJorge } from './Photojorge';

interface Proposal {
  name: string;
  email: string;
  proposal: string;
}

// Animación de aparición para el encabezado principal
const HeaderAnimated: React.FC = () => {
  const h2Ref = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const [showH2, setShowH2] = useState(false);
  const [showP, setShowP] = useState(false);
  useEffect(() => {
    const obsH2 = new window.IntersectionObserver(([entry]) => {
      setShowH2(entry.isIntersecting);
    }, { threshold: 0.2 });
    const obsP = new window.IntersectionObserver(([entry]) => {
      setShowP(entry.isIntersecting);
    }, { threshold: 0.2 });
    if (h2Ref.current) obsH2.observe(h2Ref.current);
    if (pRef.current) obsP.observe(pRef.current);
    return () => {
      obsH2.disconnect();
      obsP.disconnect();
    };
  }, []);
  return (
    <div className="relative z-10 text-center w-full">
      <div
        ref={h2Ref}
        className={`transition-all duration-700 ${showH2 ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-10'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">¡Tu voz importa!</h2>
      </div>
      <div
        ref={pRef}
        className={`transition-all duration-700 ${showP ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <p className="mt-4 text-lg text-white drop-shadow">Comparte tus ideas para mejorar el distrito</p>
      </div>
    </div>
  );
};


const Proposals: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [form, setForm] = useState({ name: '', email: '', proposal: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Enviando...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.proposal,
        }),
      });
      if (res.ok) {
        setProposals([{ ...form }, ...proposals]);
        setForm({ name: '', email: '', proposal: '' });
        setFeedback('¡Propuesta enviada! Revisa tu correo.');
      } else {
        setFeedback('Hubo un error al enviar. Intenta nuevamente.');
      }
    } catch {
      setFeedback('No se pudo conectar con el servidor.');
    }
    setTimeout(() => setFeedback(''), 4000);
  };

  return (
    <section id="propuestas" className="py-20">
      <section className="relative h-64 md:h-96 flex items-center justify-center mb-12">
        <div className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('/grupo.jpeg')`, filter: 'brightness(0.7)' }}></div>
        <HeaderAnimated />
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Tus Ideas son el Futuro</h2>
            <p className="mt-4 text-lg text-gray-600">Quiero construir un programa legislativo junto a ti. Comparte tus ideas y propuestas para mejorar nuestro distrito.</p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={form.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="proposal" className="block text-sm font-medium text-gray-700">Tu Propuesta</label>
                <textarea id="proposal" name="proposal" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={form.proposal} onChange={handleChange}></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Enviar Propuesta
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-green-600 font-semibold">{feedback}</p>
          </div>
          <div className="overflow-hidden">
            {/* Foto con animación al hacer scroll */}
            <PhotoJorge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proposals;
