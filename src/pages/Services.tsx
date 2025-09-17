import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Waves, User, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-12 w-12" />,
      name: 'Haircuts',
      description: 'Coupes modernes pour hommes, adaptées à votre style et personnalité. De la coupe classique aux tendances les plus actuelles.',
      features: ['Consultation personnalisée', 'Techniques modernes', 'Finition professionnelle', 'Conseils d\'entretien'],
      price: 'Sur devis'
    },
    {
      icon: <Waves className="h-12 w-12" />,
      name: 'Hammam',
      description: 'Tradition et relaxation dans un espace dédié au bien-être. Expérience authentique de hammam marocain.',
      features: ['Gommage traditionnel', 'Détente complète', 'Soins hydratants', 'Ambiance authentique'],
      price: 'Sur devis'
    },
    {
      icon: <User className="h-12 w-12" />,
      name: 'Soin Visage',
      description: 'Nettoyage et hydratation pour une peau éclatante. Soins adaptés à tous types de peau.',
      features: ['Analyse de peau', 'Nettoyage profond', 'Hydratation intensive', 'Conseils personnalisés'],
      price: 'Sur devis'
    },
    {
      icon: <Sparkles className="h-12 w-12" />,
      name: 'Soin Cheveux',
      description: 'Réparation et brillance pour des cheveux en parfaite santé. Traitements personnalisés selon vos besoins.',
      features: ['Diagnostic capillaire', 'Traitements réparateurs', 'Masques nourrissants', 'Protection durable'],
      price: 'Sur devis'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-poppins text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Une gamme complète de services premium pour révéler votre beauté et votre bien-être
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-yellow-400 mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-black p-8 rounded-lg border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10"
              >
                <div className="flex items-start space-x-6">
                  <div className="text-yellow-400 flex-shrink-0 p-3 bg-zinc-800 rounded-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                      {service.name}
                    </h3>
                    <p className="text-gray-300 font-poppins mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-poppins font-semibold text-yellow-400 mb-3">
                        Nos prestations :
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-400 font-poppins text-sm flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-poppins font-semibold text-lg">
                        {service.price}
                      </span>
                      <a
                        href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-poppins font-medium text-sm hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
                      >
                        Réserver
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Notre Approche
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-300 font-poppins text-lg max-w-3xl mx-auto">
              Chaque service est personnalisé selon vos besoins et vos attentes pour une expérience unique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Analyse de vos besoins et conseils personnalisés'
              },
              {
                step: '02',
                title: 'Réalisation',
                description: 'Exécution professionnelle avec les meilleures techniques'
              },
              {
                step: '03',
                title: 'Suivi',
                description: 'Conseils d\'entretien et recommandations'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-zinc-900 rounded-lg border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="text-yellow-400 font-playfair text-4xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 font-poppins">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-zinc-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à Découvrir l'Excellence ?
            </h2>
            <p className="text-gray-300 font-poppins text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour plus d'informations ou réservez directement votre rendez-vous en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+212520971277"
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                +212 520971277
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

export default Services;