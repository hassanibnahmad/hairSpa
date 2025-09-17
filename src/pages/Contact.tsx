import React, { useState } from 'react';
import bgimage from '../assets/bgimage.jpg';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Save to Supabase
    const { error } = await supabase.from('contacts').insert([
      {
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        message: formData.message,
      },
    ]);
    if (error) {
      alert('Erreur lors de l\'envoi du message.');
    } else {
      alert('Message envoyé avec succès!');
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+212 520 971 277',
      link: 'tel:+212520971277'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@guesthairspa.ma',
      link: 'mailto:contact@guesthairspa.ma'
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Résidence Les Champs du Printemps, Casablanca, Maroc',
      link: '#'
    },
    {
      icon: Clock,
      label: 'Horaires',
      value: 'Lun-Sam: 9h-20h | Dim: 10h-18h',
      link: null
    }
  ];

  return (
    <div >
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${bgimage})` }}></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Nous sommes là pour vous accompagner. N'hésitez pas à nous contacter pour toute question ou réservation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section ref={ref} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50">
                <h2 className="text-3xl font-playfair font-bold text-white mb-8">
                  Envoyez-nous un message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-playfair font-bold text-white mb-8">
                  Informations de contact
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {info.label}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reservation CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50"
              >
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">
                  Réservation en ligne
                </h3>
                <p className="text-gray-300 mb-6">
                  Pour une réservation rapide et pratique, utilisez notre système de réservation en ligne disponible 24h/24.
                </p>
                <a
                  href="https://reservation.lacaisse.ma/coiffeur/2848?fbclid=PAQ0xDSwKPIDhleHRuA2FlbQIxMAABp_snHDCZm3fHABRic2cY750bqfTeTsAiQ7JqyZULAeX_xq2rwTM65qsMm5my_aem_eEJi2EDPUr2RvPATZjmdkw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
                  >
                    Réserver maintenant
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}