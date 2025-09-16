import React from 'react';

const communes = [
  'Cabildo', 'Calle Larga', 'Catemu', 'Hijuelas', 'La Calera', 'La Cruz', 'La Ligua', 'Limache', 'Llaillay', 'Los Andes',
  'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero',
  'Rinconada', 'San Esteban', 'San Felipe', 'Santa María', 'Villa Alemana', 'Zapallar'
];

const District: React.FC = () => (
  <section id="distrito" className="py-20 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-900">Mi Compromiso: El Distrito 6</h2>
        <p className="mt-4 text-lg text-gray-600">Representando con orgullo a cada una de nuestras comunas.</p>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center">
          {communes.map((c) => (
            <div key={c} className="p-3 bg-white rounded-lg shadow-sm">{c}</div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default District;
