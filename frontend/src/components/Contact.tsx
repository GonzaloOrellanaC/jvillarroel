import React from 'react';

const Contact: React.FC = () => (
  <section id="contacto" className="py-20 bg-blue-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold">Conversemos</h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Tu opinión es importante. Contáctame a través de mis redes sociales o envíame un mensaje directo.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {/*<a href="https://wa.me/56912345678?text=Hola%20Jorge,%20quisiera%20saber%20más%20sobre%20tus%20propuestas." target="_blank" className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.424 1.903 6.14l-1.331 4.869 5.004-1.315z"/></svg>
          WhatsApp
        </a> */}
        <a href="https://x.com/JorgeVi04838120" target={'_blank'} className="flex items-center bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1199.97 0H1077.47L600.01 529.41L122.55 0H0L489.13 527.13L0 1227H122.55L600.01 697.59L1077.47 1227H1199.97L710.84 699.87L1199.97 0ZM600.01 609.13L1062.13 1200H937.13L600.01 813.87L262.89 1200H137.89L600.01 609.13ZM175.13 1100L600.01 613.87L1024.89 1100H175.13Z" fill="currentColor"/>
          </svg>
          X
        </a>
        <a href="https://www.instagram.com/jvp.diputado" target={'_blank'} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm6.5-11c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-12.5 3.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5zm12.5 1.5c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"/></svg>
          Instagram
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
