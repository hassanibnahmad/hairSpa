import React, { createContext, useContext, useState, useEffect } from 'react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image?: string;
  validUntil?: string;
  createdAt: string;
}

interface PromotionContextType {
  promotions: Promotion[];
  addPromotion: (promotion: Omit<Promotion, 'id' | 'createdAt'>) => void;
  updatePromotion: (id: string, promotion: Omit<Promotion, 'id' | 'createdAt'>) => void;
  deletePromotion: (id: string) => void;
}

const PromotionContext = createContext<PromotionContextType | undefined>(undefined);

export const usePromotions = () => {
  const context = useContext(PromotionContext);
  if (context === undefined) {
    throw new Error('usePromotions must be used within a PromotionProvider');
  }
  return context;
};

export const PromotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    // Load promotions from localStorage on component mount
    const savedPromotions = localStorage.getItem('guest-promotions');
    if (savedPromotions) {
      try {
        setPromotions(JSON.parse(savedPromotions));
      } catch (error) {
        console.error('Error loading promotions:', error);
      }
    } else {
      // Initialize with default promotions
      const defaultPromotions: Promotion[] = [
        {
          id: '1',
          title: 'Hammam Enfant Gratuit',
          description: 'Pour chaque Hammam adulte réalisé, le Hammam enfant est offert. Une occasion parfaite pour partager un moment de détente en famille.',
          image: 'https://images.pexels.com/photos/3757988/pexels-photo-3757988.jpeg?auto=compress&cs=tinysrgb&w=800',
          validUntil: '2025-06-30',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Coupe Enfant Gratuite',
          description: 'Pour chaque coupe adulte réalisée, la coupe enfant est gratuite. Profitez de ce moment pour faire plaisir à toute la famille.',
          image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
          validUntil: '2025-06-30',
          createdAt: new Date().toISOString()
        }
      ];
      setPromotions(defaultPromotions);
      localStorage.setItem('guest-promotions', JSON.stringify(defaultPromotions));
    }
  }, []);

  const savePromotions = (newPromotions: Promotion[]) => {
    setPromotions(newPromotions);
    localStorage.setItem('guest-promotions', JSON.stringify(newPromotions));
  };

  const addPromotion = (promotionData: Omit<Promotion, 'id' | 'createdAt'>) => {
    const newPromotion: Promotion = {
      ...promotionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedPromotions = [newPromotion, ...promotions];
    savePromotions(updatedPromotions);
  };

  const updatePromotion = (id: string, promotionData: Omit<Promotion, 'id' | 'createdAt'>) => {
    const updatedPromotions = promotions.map(promotion =>
      promotion.id === id
        ? { ...promotion, ...promotionData }
        : promotion
    );
    savePromotions(updatedPromotions);
  };

  const deletePromotion = (id: string) => {
    const updatedPromotions = promotions.filter(promotion => promotion.id !== id);
    savePromotions(updatedPromotions);
  };

  return (
    <PromotionContext.Provider value={{
      promotions,
      addPromotion,
      updatePromotion,
      deletePromotion
    }}>
      {children}
    </PromotionContext.Provider>
  );
};