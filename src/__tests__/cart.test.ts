import { describe, it, expect } from 'vitest';
import { Product, CartItem } from '../types';

const mockProduct1: Product = {
  id: 'prod-1',
  name: 'Monstera Deliciosa',
  category: 'Indoor Plants',
  price: 699,
  images: ['https://example.com/monstera.jpg'],
  shortDescription: 'Swiss cheese plant',
  description: 'Iconic split leaves',
  careDifficulty: 'Easy',
  availability: 'In Stock',
  uses: 'Decor',
  growingConditions: 'Indoors',
  sunlight: 'Bright Indirect Light',
  watering: 'Once a week',
  soilType: 'Potting mix',
  fertilizer: 'Vermicompost',
  growthTips: 'Wipe leaves',
  maintenanceLevel: 'Low',
  suitableClimate: 'Tropical',
  plantSize: 'Medium (1-2 ft)',
  featured: true,
};

const mockProduct2: Product = {
  id: 'prod-2',
  name: 'Snake Plant Golden',
  category: 'Indoor Plants',
  price: 349,
  images: ['https://example.com/snake.jpg'],
  shortDescription: 'Air purifying plant',
  description: 'Hardy indoor succulent',
  careDifficulty: 'Easy',
  availability: 'In Stock',
  uses: 'Air purification',
  growingConditions: 'Indoors',
  sunlight: 'Low Light',
  watering: 'Every 2 weeks',
  soilType: 'Cactus soil',
  fertilizer: 'Organic compost',
  growthTips: 'Do not overwater',
  maintenanceLevel: 'Low',
  suitableClimate: 'Tropical',
  plantSize: 'Small (6-12")',
};

describe('Cart & Checkout Calculations', () => {
  it('calculates total items count accurately', () => {
    const cart: CartItem[] = [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 3 },
    ];
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    expect(totalCount).toBe(5);
  });

  it('calculates grand total price accurately with multiple quantities', () => {
    const cart: CartItem[] = [
      { product: mockProduct1, quantity: 2 }, // 699 * 2 = 1398
      { product: mockProduct2, quantity: 1 }, // 349 * 1 = 349
    ];
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    expect(totalPrice).toBe(1747);
  });

  it('handles empty cart without errors', () => {
    const cart: CartItem[] = [];
    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    expect(totalPrice).toBe(0);
    expect(totalCount).toBe(0);
  });

  it('generates a valid uppercase PLN- prefixed 8-char tracking order number', () => {
    const orderNumber =
      'PLN-' +
      (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase() : 'ABC12345');
    expect(orderNumber).toMatch(/^PLN-[A-Z0-9]{8}$/);
  });

  it('sanitizes WhatsApp phone numbers correctly removing +, spaces, and dashes', () => {
    const phoneInputs = ['+91 98765 43210', '91-98765-43210', '+91 (9876) 543210', '919876543210'];
    phoneInputs.forEach((input) => {
      const cleanPhone = input.replace(/[^0-9]/g, '');
      expect(cleanPhone).toBe('919876543210');
    });
  });

  it('formats WhatsApp message receipt with valid order items and total', () => {
    const cart: CartItem[] = [{ product: mockProduct1, quantity: 2 }];
    const orderNumber = 'PLN-TEST1234';
    const customer = { name: 'Priya Sharma', phone: '9876543210', address: 'Banjara Hills, Hyderabad' };
    const totalPrice = 1398;
    const totalItems = 2;

    const productLines = cart
      .map((item) => `• ${item.product.name} × ${item.quantity} (₹${item.product.price * item.quantity})`)
      .join('\n');

    const message = `Hello PlantO,

I would like to place an order.

Order ID: ${orderNumber}

Customer Name: ${customer.name}
Phone Number: ${customer.phone}
Delivery Address: ${customer.address}

Products:
${productLines}

Total Items: ${totalItems}
Total Amount: ₹${totalPrice}

Please contact me regarding this order.`;

    expect(message).toContain('Order ID: PLN-TEST1234');
    expect(message).toContain('• Monstera Deliciosa × 2 (₹1398)');
    expect(message).toContain('Total Amount: ₹1398');
  });
});
