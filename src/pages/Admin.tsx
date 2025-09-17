import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import PromotionManager from '../components/admin/PromotionManager';

const Admin = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (password === '123123') {
        login();
      } else {
        setError('Mot de passe incorrect');
      }
      setIsLoading(false);
    }, 500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black p-8 rounded-lg border border-zinc-700 max-w-md w-full mx-4 relative"
        >
          {/* Back to Home Arrow - top left of box */}
          <Link to="/" className="absolute left-4 top-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-lg font-poppins">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="font-playfair text-2xl font-bold text-white mb-2">
              Administration
            </h1>
            <p className="text-gray-400 font-poppins">
              Accès réservé aux administrateurs
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-yellow-400 font-poppins font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-poppins focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors duration-300"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm font-poppins">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Admin Header */}
      <header className="bg-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-playfair text-xl font-bold text-white">
              Administration - Guest Hair & Spa
            </h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-poppins"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="promotions" element={<PromotionManager />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;