
import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('admin_token'));
    // Listen for login/logout events to update button
    const onStorage = () => setIsLogged(!!localStorage.getItem('admin_token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    console.log('Open Login', openLogin)
  }, [openLogin])

  return (
    <>
      <header id="header" className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-900">Jorge Villarroel P.</span>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#inicio" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                <a href="#biografia" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Biografía</a>
                <a href="#distrito" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Distrito 6</a>
                <a href="#propuestas" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Propuestas</a>
                <a href="#contacto" className="bg-yellow-500 text-blue-900 hover:bg-yellow-600 px-3 py-2 rounded-md text-sm font-medium">Contacto</a>
                {isLogged ? (
                  <button
                    id="add-news-header-btn"
                    className="ml-4 bg-yellow-500 text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition"
                    onClick={() => setOpenLogin(true)}
                  >
                    Agrega noticia
                  </button>
                ) : (
                  <button
                    id="login-header-btn"
                    className="ml-4 bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-900 transition"
                    onClick={() => setOpenLogin(true)}
                  >
                    Login
                  </button>
                )}
              </div>
            </nav>
            <div className="md:hidden">
              <button
                id="mobile-menu-button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="sr-only">Abrir menú</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Menú móvil */}
        <div id="mobile-menu" className={`md:hidden ${mobileOpen ? '' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#inicio" className="text-gray-600 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">Inicio</a>
            <a href="#biografia" className="text-gray-600 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">Biografía</a>
            <a href="#distrito" className="text-gray-600 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">Distrito 6</a>
            <a href="#propuestas" className="text-gray-600 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium">Propuestas</a>
            <a href="#contacto" className="bg-yellow-500 text-blue-900 hover:bg-yellow-600 block px-3 py-2 rounded-md text-base font-medium">Contacto</a>
            {isLogged ? (
              <button
                className="w-full mt-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-md text-base font-medium hover:bg-yellow-600 transition"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenLogin(true);
                }}
              >
                Agrega noticia
              </button>
            ) : (
              <button
                className="w-full mt-2 bg-blue-800 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-900 transition"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenLogin(true);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>
      <AdminPanel open={openLogin} setOpen={setOpenLogin} />
    </>
  );
};

export default Header;
