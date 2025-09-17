import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Promotions from './pages/Promotions';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { PromotionProvider } from './context/PromotionContext';

function App() {
  return (
    <AuthProvider>
      <PromotionProvider>
        <Router>
          <div className="min-h-screen bg-zinc-950 text-white">
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="promotions" element={<Promotions />} />
                    <Route path="contact" element={<Contact />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </div>
        </Router>
      </PromotionProvider>
    </AuthProvider>
  );
}

export default App;