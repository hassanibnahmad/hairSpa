
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Users, Calendar, BarChart3, CheckCircle, Trash2 } from 'lucide-react';
import { fetchPromotions, Promotion } from '../../supabasePromotions';

type Contact = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
  created_at?: string;
  read?: boolean;
};

const AdminDashboard = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loadingPromos, setLoadingPromos] = useState(true);
  // State for contact submissions
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [markingRead, setMarkingRead] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (!error) setContacts(data || []);
    setLoadingContacts(false);
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    setMarkingRead(id);
    await supabase.from('contacts').update({ read: true }).eq('id', id);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c));
    setMarkingRead(null);
  };

  const deleteContact = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setDeletingId(id);
      await supabase.from('contacts').delete().eq('id', id);
      setContacts((prev: Contact[]) => prev.filter((c: Contact) => c.id !== id));
      setDeletingId(null);
    }
  };


  const stats = [
    {
      title: 'Promotions Actives',
      value: promotions.length,
      icon: <Gift className="h-8 w-8" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      title: 'Clients',
      value: contacts.length,
      icon: <Users className="h-8 w-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      title: 'Demandes',
      value: contacts.length,
      icon: <Calendar className="h-8 w-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      title: 'Services',
      value: 4,
      icon: <Users className="h-8 w-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    }
  ];

  const quickActions = [
    {
      title: 'Gérer les Promotions',
      description: 'Ajouter, modifier ou supprimer des promotions',
      link: '/admin/promotions',
      icon: <Gift className="h-6 w-6" />,
      color: 'border-yellow-400 hover:bg-yellow-400/10'
    }
  ];

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
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-playfair text-3xl font-bold text-white mb-2">Tableau de Bord</h1>
        <p className="text-gray-400 font-poppins">Vue d'ensemble de l'administration du site</p>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-black p-6 rounded-lg border border-zinc-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 font-poppins text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h2 className="font-playfair text-2xl font-bold text-white mb-6">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.link} className={`block p-6 bg-black rounded-lg border-2 transition-all duration-300 hover:scale-105 ${action.color}`}>
              <div className="flex items-start space-x-4">
                <div className="text-yellow-400">{action.icon}</div>
                <div>
                  <h3 className="font-playfair font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-400 font-poppins text-sm">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Promotions - moved above contact table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-playfair text-2xl font-bold text-white">Promotions Récentes</h2>
          <Link to="/admin/promotions" className="text-yellow-400 hover:text-yellow-300 font-poppins text-sm transition-colors duration-300">Voir tout →</Link>
        </div>
        {loadingPromos ? (
          <div className="bg-black p-8 rounded-lg border border-zinc-700 text-center">
            <p className="text-gray-400 font-poppins">Chargement des promotions...</p>
          </div>
        ) : promotions.length === 0 ? (
          <div className="bg-black p-8 rounded-lg border border-zinc-700 text-center">
            <p className="text-gray-400 font-poppins">Aucune promotion créée. Créez votre première promotion pour commencer.</p>
            <Link to="/admin/promotions" className="inline-block mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-poppins font-medium hover:bg-yellow-300 transition-all duration-300">Créer une Promotion</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {promotions.slice(0, 3).map((promotion) => (
              <div key={promotion.id} className="bg-black p-4 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-playfair font-semibold text-white">{promotion.title}</h3>
                    <p className="text-gray-400 font-poppins text-sm mt-1">{promotion.description.substring(0, 100)}...</p>
                  </div>
                  {promotion.image && (
                    <img src={promotion.image} alt={promotion.title} className="w-16 h-16 object-cover rounded-lg" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Contact Form Submissions - Modern Table, Mark as Read, Delete */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <h2 className="font-playfair text-2xl font-bold text-white mb-6">Clients - Formulaires de Contact</h2>
        <div className="bg-black p-0 rounded-lg border border-zinc-700 overflow-hidden shadow-lg">
          {loadingContacts ? (
            <p className="text-gray-400 font-poppins text-center py-8">Chargement...</p>
          ) : contacts.length === 0 ? (
            <p className="text-gray-400 font-poppins text-center py-8">Aucune soumission de contact trouvée.</p>
          ) : (
            <div className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-yellow-400/30">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-900 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Nom</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Téléphone</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Lu</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-yellow-400 uppercase tracking-wider">Supprimer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className={contact.read === true ? '' : 'bg-zinc-800'}>
                      <td className="px-4 py-2 text-white font-poppins whitespace-nowrap">{contact.nom}</td>
                      <td className="px-4 py-2 text-white font-poppins whitespace-nowrap">{contact.email}</td>
                      <td className="px-4 py-2 text-white font-poppins whitespace-nowrap">{contact.telephone}</td>
                      <td className="px-4 py-2 text-white font-poppins max-w-xs break-words">{contact.message}</td>
                      <td className="px-4 py-2 text-gray-400 font-poppins text-xs whitespace-nowrap">{contact.created_at ? new Date(contact.created_at).toLocaleString() : ''}</td>
                      <td className="px-4 py-2 text-center">
                        {(contact.read === true) || markingRead === contact.id ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-green-600 text-white font-bold">
                            <CheckCircle className="w-4 h-4 mr-1" /> Lu
                          </span>
                        ) : (
                          <button
                            onClick={() => markAsRead(contact.id)}
                            className="inline-block px-2 py-1 text-xs rounded bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
                          >
                            Marquer comme lu
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className={`inline-flex items-center justify-center p-2 rounded hover:bg-red-600/20 transition ${deletingId === contact.id ? 'opacity-50 pointer-events-none' : ''}`}
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;