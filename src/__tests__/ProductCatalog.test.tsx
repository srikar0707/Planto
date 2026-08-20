import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCatalog } from '../components/ProductCatalog';
import { Product, Category } from '../types';

const mockCategories: Category[] = [
  { id: 'cat-indoor', name: 'Indoor Plants', group: 'Plants', description: 'Shade loving indoor plants', image: 'https://example.com/indoor.jpg' },
  { id: 'cat-flower', name: 'Flower Plants', group: 'Plants', description: 'Flowering perennial plants', image: 'https://example.com/flower.jpg' },
  { id: 'cat-pots', name: 'Pots', group: 'Other', description: 'Artisan terracotta pots', image: 'https://example.com/pots.jpg' },
];

const mockProducts: Product[] = [
  {
    id: '1',
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
    watering: 'Weekly',
    soilType: 'Potting mix',
    fertilizer: 'Vermicompost',
    growthTips: 'Wipe leaves',
    maintenanceLevel: 'Low',
    suitableClimate: 'Tropical',
    plantSize: 'Medium (1-2 ft)',
    featured: true,
  },
  {
    id: '2',
    name: 'Peace Lily',
    category: 'Flower Plants',
    price: 399,
    images: ['https://example.com/lily.jpg'],
    shortDescription: 'White blooms',
    description: 'Purifies indoor air',
    careDifficulty: 'Moderate',
    availability: 'In Stock',
    uses: 'Air purification',
    growingConditions: 'Indoors',
    sunlight: 'Partial Shade',
    watering: 'Weekly',
    soilType: 'Potting mix',
    fertilizer: 'Organic compost',
    growthTips: 'Keep humid',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Tropical',
    plantSize: 'Small (6-12")',
    featured: false,
  },
  {
    id: '3',
    name: 'Terracotta Handcrafted Pot',
    category: 'Pots',
    price: 249,
    images: ['https://example.com/pot.jpg'],
    shortDescription: 'Clay breathable pot',
    description: 'Porous terracotta',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Plant container',
    growingConditions: 'All',
    sunlight: 'Direct Sunlight',
    watering: 'N/A',
    soilType: 'N/A',
    fertilizer: 'N/A',
    growthTips: 'Clean regularly',
    maintenanceLevel: 'Low',
    suitableClimate: 'All',
    plantSize: 'Standard',
    featured: false,
  },
];

describe('ProductCatalog Component', () => {
  it('renders circular categories and all products when category is All', () => {
    render(
      <ProductCatalog
        products={mockProducts}
        categories={mockCategories}
        selectedCategory="All"
        onSelectCategory={vi.fn()}
        onAddToCart={vi.fn()}
        onViewDetails={vi.fn()}
        searchQuery=""
        setSearchQuery={vi.fn()}
      />
    );

    // Verify categories rendered
    expect(screen.getByText('All Collection')).toBeInTheDocument();
    expect(screen.getAllByText('Indoor Plants').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Flower Plants').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Pots').length).toBeGreaterThanOrEqual(1);

    // Verify products rendered
    expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    expect(screen.getByText('Peace Lily')).toBeInTheDocument();
    expect(screen.getByText('Terracotta Handcrafted Pot')).toBeInTheDocument();
  });

  it('triggers onSelectCategory when clicking a circular category card', () => {
    const selectCategorySpy = vi.fn();

    render(
      <ProductCatalog
        products={mockProducts}
        categories={mockCategories}
        selectedCategory="All"
        onSelectCategory={selectCategorySpy}
        onAddToCart={vi.fn()}
        onViewDetails={vi.fn()}
        searchQuery=""
        setSearchQuery={vi.fn()}
      />
    );

    const potsCategoryElements = screen.getAllByText('Pots');
    fireEvent.click(potsCategoryElements[0]);

    expect(selectCategorySpy).toHaveBeenCalledWith('Pots');
  });

  it('filters products correctly and renders category banner when category is selected', () => {
    render(
      <ProductCatalog
        products={mockProducts}
        categories={mockCategories}
        selectedCategory="Pots"
        onSelectCategory={vi.fn()}
        onAddToCart={vi.fn()}
        onViewDetails={vi.fn()}
        searchQuery=""
        setSearchQuery={vi.fn()}
      />
    );

    expect(screen.getByText('Terracotta Handcrafted Pot')).toBeInTheDocument();
    expect(screen.queryByText('Monstera Deliciosa')).not.toBeInTheDocument();
    expect(screen.queryByText('Peace Lily')).not.toBeInTheDocument();
    expect(screen.getByText('Back to All Categories')).toBeInTheDocument();
  });

  it('filters products correctly by search query', () => {
    render(
      <ProductCatalog
        products={mockProducts}
        categories={mockCategories}
        selectedCategory="All"
        onSelectCategory={vi.fn()}
        onAddToCart={vi.fn()}
        onViewDetails={vi.fn()}
        searchQuery="Lily"
        setSearchQuery={vi.fn()}
      />
    );

    expect(screen.getByText('Peace Lily')).toBeInTheDocument();
    expect(screen.queryByText('Monstera Deliciosa')).not.toBeInTheDocument();
    expect(screen.queryByText('Terracotta Handcrafted Pot')).not.toBeInTheDocument();
  });
});
