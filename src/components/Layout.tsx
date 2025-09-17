import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Scissors } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}


import { useEffect } from 'react';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/services', label: 'Nos Services' },
    { path: '/promotions', label: 'Promotions' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-yellow-400" />
              <span className="font-playfair text-xl font-bold text-white">Guest Hair & Spa</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-poppins text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-poppins font-medium text-sm hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
              >
                Réserver en ligne
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-poppins text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-poppins font-medium text-sm hover:bg-yellow-300 transition-all duration-300"
              >
                Réserver en ligne
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="h-8 w-8 text-yellow-400" />
                <span className="font-playfair text-xl font-bold text-white">Guest Hair & Spa</span>
              </div>
              <p className="text-gray-400 font-poppins max-w-md">
                Un espace élégant dédié aux soins, aux coupes et au bien-être. Inspiré par les tendances internationales.
              </p>
            </div>

            <div>
              <h3 className="font-playfair text-lg font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-poppins"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-playfair text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 font-poppins">
                <p>+212 520971277</p>
                <p>contact@guesthairspa.ma</p>
                <p className="text-sm">Résidence Les Champs du Printemps<br />Casablanca, Maroc</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-poppins text-sm">
              © 2025 Guest Hair & Spa. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;