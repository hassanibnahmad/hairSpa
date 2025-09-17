// Uploads an image file to Supabase Storage and returns the public URL
export async function uploadPromotionImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const { data, error } = await supabase.storage.from('promotions').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  });
  if (error) throw error;
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('promotions').getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}
import { supabase } from './supabaseClient';

export type Promotion = {
  id: string;
  title: string;
  description: string;
  image?: string;
  created_at?: string;
};

export async function fetchPromotions() {
  const { data, error } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Promotion[];
}

export async function addPromotion(promotion: Omit<Promotion, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('promotions').insert([promotion]).select();
  if (error) throw error;
  return data?.[0] as Promotion;
}

export async function updatePromotion(id: string, updates: Partial<Omit<Promotion, 'id' | 'created_at'>>) {
  const { data, error } = await supabase.from('promotions').update(updates).eq('id', id).select();
  if (error) throw error;
  return data?.[0] as Promotion;
}

export async function deletePromotion(id: string) {
  const { error } = await supabase.from('promotions').delete().eq('id', id);
  if (error) throw error;
  return true;
}
