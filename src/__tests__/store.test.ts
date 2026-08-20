import { describe, it, expect } from 'vitest';
import { store, normalizeImageUrl } from '../lib/store';
import { INITIAL_SETTINGS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';

describe('Store & Initial Data Integrity', () => {
  it('contains valid default nursery website settings', () => {
    expect(INITIAL_SETTINGS.companyName).toBe('PlantO Nursery Gardens');
    expect(INITIAL_SETTINGS.whatsAppNumber).toBeTruthy();
    expect(INITIAL_SETTINGS.contactPhone).toBeTruthy();
    expect(INITIAL_SETTINGS.contactEmail).toContain('@');
  });

  it('contains valid initial categories', () => {
    expect(INITIAL_CATEGORIES.length).toBeGreaterThan(5);
    INITIAL_CATEGORIES.forEach((cat) => {
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(['Plants', 'Other']).toContain(cat.group);
    });
  });

  it('contains valid initial products with non-negative prices', () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThan(0);
    INITIAL_PRODUCTS.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.images.length).toBeGreaterThan(0);
    });
  });

  it('generates an order ID safely when calling store.createOrder', async () => {
    const mockOrder = {
      customerName: 'Kavita Rao',
      phone: '9876543210',
      address: 'Madhapur, Hyderabad',
      items: [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
      totalAmount: INITIAL_PRODUCTS[0].price,
    };

    const orderId = await store.createOrder(mockOrder);
    expect(orderId).toMatch(/^PLN-[A-Z0-9]{8}$/);
  });

  it('normalizes private Supabase storage URLs to clean relative /storage/ proxy paths', () => {
    const rawSupabaseUrl =
      'https://netaqfodhssuzssqdqhu.supabase.co/storage/v1/object/public/product-images/products/monstera-123.jpg';
    const normalized = normalizeImageUrl(rawSupabaseUrl);
    expect(normalized).toBe('/storage/product-images/products/monstera-123.jpg');
    expect(normalized).not.toContain('supabase.co');

    // Leaves standard external URLs and relative URLs untouched
    expect(normalizeImageUrl('https://images.unsplash.com/photo-123')).toBe(
      'https://images.unsplash.com/photo-123'
    );
    expect(normalizeImageUrl('/storage/product-images/products/test.png')).toBe(
      '/storage/product-images/products/test.png'
    );
  });
});
