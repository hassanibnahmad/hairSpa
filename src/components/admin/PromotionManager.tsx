import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon, Save, X } from 'lucide-react';
import {
  fetchPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
  uploadPromotionImage
} from '../../supabasePromotions';

interface PromotionForm {
  title: string;
  description: string;
  image: string;
  validUntil: string;
}

const PromotionManager = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PromotionForm>({
    title: '',
    description: '',
    image: '',
    validUntil: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  React.useEffect(() => {
    const loadPromotions = async () => {
      setLoading(true);
      const promos = await fetchPromotions();
      setPromotions(promos || []);
      setLoading(false);
    };
    loadPromotions();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      validUntil: ''
    });
    setImageFile(null);
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.validUntil || (!formData.image && !imageFile)) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
    setLoading(true);
    let imageUrl = formData.image;
    if (imageFile) {
      try {
        imageUrl = await uploadPromotionImage(imageFile);
      } catch (err) {
        alert("Erreur lors du téléchargement de l'image.");
        setLoading(false);
        return;
      }
    }
    const dataToSave = { ...formData, image: imageUrl };
    if (editingId) {
      await updatePromotion(editingId, dataToSave);
    } else {
      await addPromotion(dataToSave);
    }
    const promos = await fetchPromotions();
    setPromotions(promos || []);
    setLoading(false);
    setSuccessMsg('Promotion ajoutée avec succès !');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetForm();
  };

  const handleEdit = (promotion: any) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      image: promotion.image || '',
      validUntil: promotion.validUntil || ''
    });
    setEditingId(promotion.id);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
      setLoading(true);
      await deletePromotion(id);
      const promos = await fetchPromotions();
      setPromotions(promos || []);
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('La taille de l\'image ne doit pas dépasser 5 Mo.');
        return;
      }
      setImageFile(file);
      setFormData({ ...formData, image: '' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-playfair text-3xl font-bold text-white mb-2">
            Gestion des Promotions
          </h1>
          <p className="text-gray-400 font-poppins">
            Créer, modifier et supprimer les promotions du site
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsCreating(true)}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-400/25"
        >
          <Plus className="h-5 w-5" />
          Nouvelle Promotion
        </motion.button>
      </div>

      {/* Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black p-8 rounded-lg border border-zinc-700"
        >
          {successMsg && (
            <div className="mb-4 p-3 rounded bg-green-700 text-green-100 font-poppins text-center animate-fade-in">
              {successMsg}
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-xl font-bold text-white">
              {editingId ? 'Modifier la Promotion' : 'Nouvelle Promotion'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-400 font-poppins font-medium mb-2">
                Titre *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-poppins focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors duration-300"
                placeholder="Titre de la promotion"
                minLength={2}
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-poppins font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minLength={2}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-poppins focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors duration-300 resize-vertical"
                placeholder="Description de la promotion"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-poppins font-medium mb-2">
                Image *
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  required={!formData.image && !imageFile}
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  <ImageIcon className="h-5 w-5" />
                  Choisir une image
                </label>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 font-poppins font-medium mb-2">
                Valide jusqu'au *
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-poppins focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-poppins font-medium hover:bg-yellow-300 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                )}
                <Save className="h-5 w-5" />
                {editingId ? 'Mettre à jour' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-zinc-700 text-gray-300 rounded-lg font-poppins font-medium hover:bg-zinc-800 transition-all duration-300"
                disabled={loading}
              >
                Annuler
              </button>
              {loading && (
                <span className="text-yellow-400 font-poppins ml-2">Chargement...</span>
              )}
            </div>
          </form>
        </motion.div>
      )}

      {/* Promotions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-playfair text-xl font-bold text-white mb-6">
          Promotions Existantes ({promotions.length})
        </h2>
        {loading ? (
          <div className="text-center text-gray-400 font-poppins">Chargement...</div>
        ) : promotions.length === 0 ? (
          <div className="bg-black p-8 rounded-lg border border-zinc-700 text-center">
            <p className="text-gray-400 font-poppins">
              Aucune promotion créée. Créez votre première promotion pour commencer.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {promotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-300 overflow-hidden"
              >
                {promotion.image && (
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-playfair text-lg font-bold text-white mb-2">
                        {promotion.title}
                      </h3>
                      <p className="text-gray-300 font-poppins text-sm">
                        {promotion.description}
                      </p>
                      {promotion.validUntil && (
                        <p className="text-gray-500 font-poppins text-xs mt-2">
                          Valide jusqu'au {new Date(promotion.validUntil).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(promotion)}
                      className="flex items-center gap-1 bg-zinc-800 text-yellow-400 px-3 py-2 rounded font-poppins text-sm hover:bg-zinc-700 transition-colors duration-300"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(promotion.id)}
                      className="flex items-center gap-1 bg-zinc-800 text-red-400 px-3 py-2 rounded font-poppins text-sm hover:bg-zinc-700 transition-colors duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PromotionManager;