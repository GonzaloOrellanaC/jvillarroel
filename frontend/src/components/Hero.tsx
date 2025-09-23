import React from 'react';

const Hero: React.FC = () => (

  <section id="inicio" className="bg-hero">
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Imagen arriba en móvil, derecha en md+ */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-full max-w-sm">
            <img
              id="jorge-img"
              src="/jorge-kaiser.jpeg"
              alt="Foto de Jorge Villarroel Pérez"
              className="fade-in"
              style={{ maxHeight: 400, width: 400, objectFit: 'cover', objectPosition: 'top', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
        {/* Texto abajo en móvil, izquierda en md+ */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
            Jorge Villarroel Pérez
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Un candidato comprometido con el futuro del <span className="font-bold text-yellow-600">Distrito 6</span>.
          </p>
          <p className="mt-2 text-gray-600">
            Trabajando por más libertad, seguridad y oportunidades para nuestra gente.
          </p>
          <a href="#propuestas" className="mt-8 inline-block bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition duration-300">
            Conoce y Envía tu Propuesta
          </a>
          <div className="mt-12">
            {/* Aquí irá la sección de noticias dinámicas */}
            <div id="noticias-section"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
