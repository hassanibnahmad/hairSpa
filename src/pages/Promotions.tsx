import React from 'react';
import bgimage from '../assets/bgimage.jpg';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchPromotions } from '../supabasePromotions';

const Promotions = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loadingPromos, setLoadingPromos] = useState(true);
  useEffect(() => {
    const loadPromos = async () => {
      setLoadingPromos(true);
      try {
        const promos = await fetchPromotions();
        setPromotions(promos || []);
      } catch (err) {
        setPromotions([]);
      }
      setLoadingPromos(false);
    };
    loadPromos();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      
       <section className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${bgimage})` }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
              Promotions Exclusives
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Découvrez nos offres spéciales et profitez de services premium à prix avantageux
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="bg-zinc-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loadingPromos ? (
            <div className="col-span-2 text-center text-yellow-400 font-poppins">Chargement des promotions...</div>
          ) : promotions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <h2 className="font-playfair text-3xl font-bold text-white mb-4">
                Aucune promotion disponible
              </h2>
              <p className="text-gray-400 font-poppins">
                Revenez bientôt pour découvrir nos offres spéciales !
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promotions.map((promotion, index) => (
                <motion.div
                  key={promotion.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-black rounded-lg overflow-hidden border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
                >
                  <div className="relative">
                    {promotion.image && (
                      <img
                        src={promotion.image}
                        alt={promotion.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-bold text-yellow-400 mb-2">
                      {promotion.title}
                    </h3>
                    <p className="text-gray-300 font-poppins mb-4">
                      {promotion.description}
                    </p>
                    {promotion.validUntil && (
                      <p className="text-gray-500 font-poppins text-sm mb-4">
                        Valide jusqu'au {new Date(promotion.validUntil).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                    <a
                      href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
                    >
                      Réserver Maintenant
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Ne Ratez Aucune Offre !
            </h2>
            <p className="text-gray-300 font-poppins text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour plus d'informations sur nos promotions en cours ou réservez directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+212520971277"
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Nous Appeler
              </a>
              <a
                href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
              >
                Réserver en Ligne
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;