import { Category, OrderRecord, Product, WebsiteSettings } from '../types';
import { supabase } from './supabase';

const client = () => {
  if (!supabase) throw new Error('PlantO is not connected to Supabase. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  return supabase;
};

export const store = {
  async loadCatalog(): Promise<{ products: Product[]; categories: Category[]; settings: WebsiteSettings | null }> {
    const db = client();
    const [products, categories, settings] = await Promise.all([
      db.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      db.from('categories').select('*').order('name'),
      db.from('store_settings').select('value').eq('key', 'storefront').maybeSingle(),
    ]);
    if (products.error) throw products.error;
    if (categories.error) throw categories.error;
    return {
      products: products.data.map(toProduct),
      categories: categories.data.map(toCategory),
      settings: normalizeSettings(settings.data?.value as WebsiteSettings | null),
    };
  },

  async saveProduct(product: Product) {
    const db = client();
    const row = { id: product.id.startsWith('new-') ? undefined : product.id, ...productToRow(product) };
    const result = await db.from('products').upsert(row).select().single();
    if (result.error) throw result.error;
    return toProduct(result.data);
  },

  async deleteProduct(id: string) { const { error } = await client().from('products').delete().eq('id', id); if (error) throw error; },
  async saveCategory(category: Category) {
    const row = { id: category.id.startsWith('new-') ? undefined : category.id, name: category.name, group_name: category.group, description: category.description, image_url: category.image };
    const result = await client().from('categories').upsert(row).select().single();
    if (result.error) throw result.error;
    return toCategory(result.data);
  },
  async deleteCategory(id: string) { const { error } = await client().from('categories').delete().eq('id', id); if (error) throw error; },
  async saveSettings(settings: WebsiteSettings) { const { error } = await client().from('store_settings').upsert({ key: 'storefront', value: settings }); if (error) throw error; },
  async createOrder(order: Omit<OrderRecord, 'id' | 'date' | 'status'>): Promise<string> {
    const orderNumber = 'PLN-' + (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase() : Math.random().toString(36).substring(2, 10).toUpperCase());
    try {
      if (supabase) {
        await supabase.from('orders').insert({
          order_number: orderNumber,
          customer_name: order.customerName,
          phone: order.phone,
          address: order.address,
          items: order.items,
          total_amount: order.totalAmount,
        });
      }
    } catch (err) {
      console.warn('Order could not be saved to Supabase database, proceeding with WhatsApp checkout:', err);
    }
    return orderNumber;
  },
  async listOrders(): Promise<OrderRecord[]> {
    const { data, error } = await client().from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data.map((row: any) => ({ id: row.order_number, date: row.created_at, customerName: row.customer_name, phone: row.phone, address: row.address ?? '', items: row.items, totalAmount: Number(row.total_amount), status: row.status }));
  },
  async uploadProductImage(file: File) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `products/${crypto.randomUUID()}.${extension}`;
    const { error } = await client().storage.from('product-images').upload(path, file, { upsert: false, contentType: file.type, cacheControl: '31536000' });
    return `/storage/product-images/${path}`;
  },
};

export const normalizeImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';
  return url.replace(/^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\//i, '/storage/');
};

const normalizeSettings = (settings: WebsiteSettings | null): WebsiteSettings | null => {
  if (!settings) return null;
  return {
    ...settings,
    logoUrl: normalizeImageUrl(settings.logoUrl),
    aboutUsImage: settings.aboutUsImage ? normalizeImageUrl(settings.aboutUsImage) : settings.aboutUsImage,
    landscapingImage: settings.landscapingImage ? normalizeImageUrl(settings.landscapingImage) : settings.landscapingImage,
    services: settings.services?.map((s) => ({
      ...s,
      image: normalizeImageUrl(s.image),
    })),
    completedProjects: settings.completedProjects?.map((p) => ({
      ...p,
      imageUrl: normalizeImageUrl(p.imageUrl),
    })),
  };
};

const toProduct = (row: any): Product => ({
  id: row.id, name: row.name, category: row.category, price: Number(row.price),
  images: Array.isArray(row.images) ? row.images.map(normalizeImageUrl) : [],
  shortDescription: row.short_description, description: row.description, careDifficulty: row.care_difficulty,
  availability: row.availability, uses: row.uses, growingConditions: row.growing_conditions, sunlight: row.sunlight,
  watering: row.watering, soilType: row.soil_type, fertilizer: row.fertilizer, growthTips: row.growth_tips,
  maintenanceLevel: row.maintenance_level, suitableClimate: row.suitable_climate, plantSize: row.plant_size,
  featured: row.featured, rating: row.rating === null ? undefined : Number(row.rating), reviewsCount: row.reviews_count ?? undefined,
});
const productToRow = (p: Product) => ({
  name: p.name, category: p.category, price: p.price, images: p.images, short_description: p.shortDescription,
  description: p.description, care_difficulty: p.careDifficulty, availability: p.availability, uses: p.uses,
  growing_conditions: p.growingConditions, sunlight: p.sunlight, watering: p.watering, soil_type: p.soilType,
  fertilizer: p.fertilizer, growth_tips: p.growthTips, maintenance_level: p.maintenanceLevel,
  suitable_climate: p.suitableClimate, plant_size: p.plantSize, featured: p.featured ?? false,
  rating: p.rating ?? null, reviews_count: p.reviewsCount ?? null, is_active: p.availability !== 'Out of Stock',
});
const toCategory = (row: any): Category => ({
  id: row.id,
  name: row.name,
  group: row.group_name,
  description: row.description,
  image: normalizeImageUrl(row.image_url),
});
