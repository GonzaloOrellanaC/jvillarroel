import React, { useRef, useEffect, useState } from 'react';

const communes = [
  'Cabildo', 'Calle Larga', 'Catemu', 'Hijuelas', 'La Calera', 'La Cruz', 'La Ligua', 'Limache', 'Llaillay', 'Los Andes',
  'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero',
  'Rinconada', 'San Esteban', 'San Felipe', 'Santa María', 'Villa Alemana', 'Zapallar'
];


const District: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const options = { threshold: 0.2 };
    const handleObs = (ref: React.RefObject<HTMLDivElement>, setShow: (v: boolean) => void) => {
      if (!ref.current) return;
      const obs = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setShow(true);
      }, options);
      obs.observe(ref.current);
      return obs;
    };
    const obs1 = handleObs(titleRef, setShowTitle);
    const obs2 = handleObs(gridRef, setShowGrid);
    return () => {
      obs1 && obs1.disconnect();
      obs2 && obs2.disconnect();
    };
  }, []);

  return (
    <section id="distrito" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center transition-all duration-700 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionProperty: 'opacity, transform' }}>
          <h2 className="text-3xl font-bold text-blue-900">Mi Compromiso: El Distrito 6</h2>
          <p className="mt-4 text-lg text-gray-600">Representando con orgullo a cada una de nuestras comunas.</p>
        </div>
        <div className="mt-12">
          <div ref={gridRef} className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center transition-all duration-700 ${showGrid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionProperty: 'opacity, transform' }}>
            {communes.map((c, i) => (
              <div key={c} style={{ transition: 'opacity 0.7s, transform 0.7s', transitionDelay: `${i * 40}ms` }} className={showGrid ? 'p-3 bg-white rounded-lg shadow-sm opacity-100 translate-y-0' : 'p-3 bg-white rounded-lg shadow-sm opacity-0 translate-y-6'}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default District;
