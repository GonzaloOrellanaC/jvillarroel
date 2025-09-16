import React from 'react';

const Contact: React.FC = () => (
  <section id="contacto" className="py-20 bg-blue-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold">Conversemos</h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Tu opinión es importante. Contáctame a través de mis redes sociales o envíame un mensaje directo.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="https://wa.me/56912345678?text=Hola%20Jorge,%20quisiera%20saber%20más%20sobre%20tus%20propuestas." target="_blank" className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.424 1.903 6.14l-1.331 4.869 5.004-1.315z"/></svg>
          WhatsApp
        </a>
        <a href="#" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.634 4.208 3.803 4.649-.6.16-1.23.246-1.875.246-.306 0-.6-.03-1.05-.098.63 1.953 2.448 3.377 4.604 3.417-1.79 1.484-4.076 2.37-6.555 2.37-.42 0-.835-.025-1.45-.086 2.32 1.564 5.076 2.48 8.04 2.48 8.12 0 12.92-6.924 12.28-13.38 1.02-.732 1.83-1.66 2.48-2.758z"/></svg>
          Twitter/X
        </a>
        <a href="#" className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm6.5-11c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-12.5 3.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5-4.5-2.015-4.5-4.5zm12.5 1.5c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"/></svg>
          Instagram
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
