import React, { useState } from 'react';

interface Proposal {
  name: string;
  email: string;
  proposal: string;
}

const Proposals: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [form, setForm] = useState({ name: '', email: '', proposal: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposals([{ ...form }, ...proposals]);
    setForm({ name: '', email: '', proposal: '' });
    setFeedback('¡Propuesta enviada!');
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <section id="propuestas" className="py-20">
      <section className="relative h-64 md:h-96 flex items-center justify-center mb-12">
        <div className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('/grupo.jpeg')`, filter: 'brightness(0.7)' }}></div>
        <div className="relative z-10 text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">¡Tu voz importa!</h2>
          <p className="mt-4 text-lg text-white drop-shadow">Comparte tus ideas para mejorar el distrito</p>
        </div>
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
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Propuestas Ciudadanas</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
              {proposals.length === 0 && <p className="text-gray-500">Aún no hay propuestas enviadas.</p>}
              {proposals.map((p, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="font-bold text-blue-900">{p.name}</div>
                  <div className="text-gray-600 text-sm mb-2">{p.email}</div>
                  <div>{p.proposal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proposals;
