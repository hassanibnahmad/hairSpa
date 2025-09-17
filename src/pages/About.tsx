import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Des services de qualité premium inspirés des tendances internationales'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Équipe Experte',
      description: 'Professionnels qualifiés et passionnés par leur métier'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Disponibilité',
      description: 'Horaires flexibles pour s\'adapter à votre emploi du temps'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6"
          >
            À Propos de Guest Hair & Spa
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-yellow-400 mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Guest Hair & Spa Interior"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
                Notre Histoire
              </h2>
              <p className="text-gray-300 font-poppins text-lg leading-relaxed">
                Guest Hair & Spa est né de la passion pour l'excellence et le bien-être. Situé au cœur de Casablanca, notre salon représente un espace élégant dédié aux soins, aux coupes et au bien-être.
              </p>
              <p className="text-gray-300 font-poppins text-lg leading-relaxed">
                Inspiré par les tendances internationales, nous offrons une expérience unique qui allie tradition marocaine et modernité contemporaine. Notre équipe de professionnels qualifiés s'engage à vous offrir des services premium dans un environnement luxueux et apaisant.
              </p>
              <p className="text-gray-300 font-poppins text-lg leading-relaxed">
                Chaque visite chez Guest Hair & Spa est pensée comme un moment de détente et de transformation, où le raffinement rencontre l'expertise pour révéler votre beauté naturelle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-zinc-900 rounded-lg border border-zinc-700 hover:border-yellow-400/50 transition-all duration-300 hover:bg-zinc-800"
              >
                <div className="text-yellow-400 mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-poppins leading-relaxed">
                  {feature.description}
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
            <Scissors className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt pour une Expérience Premium ?
            </h2>
            <p className="text-gray-300 font-poppins text-lg mb-8 max-w-2xl mx-auto">
              Découvrez l'excellence de nos services dans un cadre élégant et professionnel. Réservez dès maintenant votre rendez-vous.
            </p>
            <a
              href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25"
            >
              Réserver Maintenant
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;