import React from 'react';
import { useEffect, useState } from 'react';
import { fetchPromotions } from '../supabasePromotions';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Waves, User, Sparkles, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      name: 'Haircuts',
      description: 'Coupes modernes et classiques'
    },
    {
      icon: <Waves className="h-8 w-8" />,
      name: 'Hammam',
      description: 'Expérience de relaxation complète'
    },
    {
      icon: <User className="h-8 w-8" />,
      name: 'Soin Visage',
      description: 'Soins pour une peau éclatante'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      name: 'Soin Cheveux',
      description: 'Traitements pour cheveux sains'
    }
  ];

  const testimonials = [
    {
      name: 'Yassine',
      rating: 5,
      comment: 'Un service premium, digne d\'un spa de luxe.'
    },
    {
      name: 'Nouhaila',
      rating: 5,
      comment: 'Ambiance élégante et très professionnelle.'
    }
  ];

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Guest Hair & Spa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-poppins text-xl md:text-2xl text-gray-300 mb-8"
          >
            Élégance. Style. Bien-être.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/services"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
            >
              Voir Nos Services
            </Link>
            <a
              href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
            >
              Réserver Maintenant
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Nos Services
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-zinc-800 p-8 rounded-lg text-center hover:bg-zinc-700 transition-all duration-300 border border-zinc-700 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-400 font-poppins">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Promotions
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loadingPromos ? (
              <div className="col-span-2 text-center text-yellow-400 font-poppins">Chargement des promotions...</div>
            ) : promotions.length === 0 ? (
              <div className="col-span-2 text-center text-gray-400 font-poppins">Aucune promotion en cours.</div>
            ) : (
              promotions.map((promotion, index) => (
                <motion.div
                  key={promotion.id || promotion.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 group"
                >
                  <div className="absolute inset-0">
                    <img
                      src={promotion.image}
                      alt={promotion.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                  </div>
                  <div className="relative p-8">
                    <h3 className="font-playfair text-2xl font-bold text-yellow-400 mb-2">
                      {promotion.title}
                    </h3>
                    <p className="text-gray-300 font-poppins text-lg">
                      {promotion.description || promotion.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/promotions"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
            >
              Voir Toutes les Promotions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Avis Clients
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-black p-8 rounded-lg border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 font-poppins mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <p className="text-yellow-400 font-playfair font-semibold">
                  — {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;