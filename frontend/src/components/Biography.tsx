import React, { useRef, useEffect, useState } from 'react';


const Biography: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const options = { threshold: 0.2 };
    const handleObs = (ref: React.RefObject<HTMLDivElement>, setShow: (v: boolean) => void) => {
      if (!ref.current) return;
      const obs = new window.IntersectionObserver(([entry]) => {
        setShow(entry.isIntersecting);
      }, options);
      obs.observe(ref.current);
      return obs;
    };
    const obs1 = handleObs(titleRef, setShowTitle);
    const obs2 = handleObs(textRef, setShowText);
    const obs3 = handleObs(cardRef, setShowCard);
    return () => {
      obs1 && obs1.disconnect();
      obs2 && obs2.disconnect();
      obs3 && obs3.disconnect();
    };
  }, []);

  return (
    <section id="biografia" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div ref={titleRef} className={`text-center transition-all duration-700 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionProperty: 'opacity, transform' }}>
          <h2 className="text-3xl font-bold text-blue-900">Sobre Mí</h2>
          <p className="mt-4 text-lg text-gray-600">Una vida de servicio y compromiso con nuestra región.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div ref={textRef} className={`md:col-span-3 transition-all duration-700 ${showText ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionProperty: 'opacity, transform' }}>
            <p className="text-gray-700 leading-relaxed">
              Soy Jorge Villarroel Pérez, un ciudadano del Distrito 6 con una profunda vocación de servicio público. Nacido y criado en la región, conozco de cerca las necesidades y los anhelos de nuestros vecinos. Mi trayectoria profesional se ha centrado en el desarrollo local y el emprendimiento, buscando siempre generar oportunidades y mejorar la calidad de vida de nuestra comunidad.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Creo en un futuro donde el esfuerzo individual sea recompensado, donde la seguridad sea un derecho garantizado y donde el Estado sirva a las personas, y no al revés. Mi compromiso es llevar la voz de cada uno de ustedes al Congreso, legislando con sentido común, responsabilidad y una inquebrantable defensa de la libertad.
            </p>
          </div>
          <div ref={cardRef} className={`md:col-span-2 card p-8 bg-blue-800 text-white transition-all duration-700 ${showCard ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionProperty: 'opacity, transform' }}>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Mis Pilares</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✔</span>
                <span><strong className="font-semibold">Más Seguridad:</strong> Mano dura contra la delincuencia y el narcotráfico.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✔</span>
                <span><strong className="font-semibold">Crecimiento Económico:</strong> Menos burocracia y más apoyo a pymes y emprendedores.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✔</span>
                <span><strong className="font-semibold">Libertad y Familia:</strong> Defensa de los valores fundamentales y la libertad de elección.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✔</span>
                <span><strong className="font-semibold">Gobierno Eficiente:</strong> Reducción del gasto político y optimización de recursos.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
