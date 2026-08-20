import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import {
  Search,
  ShoppingBag,
  Eye,
  Sparkles,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Layers,
  Sparkle
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/initialData';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onViewDetails,
  searchQuery,
  setSearchQuery,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categoriesList: Category[] =
    categories && categories.length > 0 ? categories : INITIAL_CATEGORIES;

  // Active Category details if viewing a specific category
  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === 'All' || selectedCategory === 'Plants') return null;
    return categoriesList.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [categoriesList, selectedCategory]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category match
        let matchesCategory = true;
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Plants') {
            const plantCategories = [
              'Indoor Plants',
              'Flower Plants',
              'Fruit Plants',
              'Creeper Plants',
              'Bonsai Plants',
              'Gift Plants',
              'Cactus Plants',
            ];
            matchesCategory = plantCategories.includes(product.category);
          } else {
            matchesCategory =
              product.category.toLowerCase() === selectedCategory.toLowerCase();
          }
        }

        // Search match
        let matchesSearch = true;
        if (searchQuery.trim().length > 0) {
          const query = searchQuery.toLowerCase();
          matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.shortDescription.toLowerCase().includes(query) ||
            product.uses.toLowerCase().includes(query);
        }

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleCategorySelect = (categoryName: string) => {
    onSelectCategory(categoryName);
    // Smooth scroll to catalog view
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  return (
    <section id="products" className="py-16 bg-[#F9F8F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
            Curated Botanical Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022]">
            Nursery Products & Plants
          </h2>
          <div className="w-16 h-0.5 bg-[#2D4F36] mx-auto mt-4 mb-4"></div>
          <p className="text-xs sm:text-sm text-[#1B3022]/70 max-w-xl mx-auto">
            Explore acclimatized indoor plants, flowering shrubs, fruit trees, artisan pots, organic soils, and gardening supplies.
          </p>
        </div>

        {/* 1. CIRCULAR CATEGORY PANEL */}
        {/* On mobile: 2 categories per row (grid-cols-2). On desktop: 4-7 per row */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B3022]/80 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#2D4F36]" />
              <span>Explore Categories</span>
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => handleCategorySelect('All')}
                className="text-xs font-bold text-[#2D4F36] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Collection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
            {/* "All Collection" Circular Card */}
            <div
              onClick={() => handleCategorySelect('All')}
              className={`group flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-white shadow-md border border-[#2D4F36]/30'
                  : 'bg-white/60 hover:bg-white border border-[#1B3022]/10 hover:shadow-sm'
              }`}
            >
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 ${
                  selectedCategory === 'All'
                    ? 'ring-4 ring-[#2D4F36] ring-offset-2 shadow-md'
                    : 'group-hover:scale-105 border-2 border-[#1B3022]/15'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80"
                  alt="All Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#1B3022]/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white drop-shadow" />
                </div>
              </div>
              <span
                className={`text-xs sm:text-sm font-serif font-bold text-center mt-2.5 transition-colors line-clamp-1 ${
                  selectedCategory === 'All'
                    ? 'text-[#2D4F36]'
                    : 'text-[#1B3022] group-hover:text-[#2D4F36]'
                }`}
              >
                All Collection
              </span>
              <span className="text-[10px] text-[#1B3022]/50 font-medium">
                {products.length} items
              </span>
            </div>

            {/* Category Circular Cards */}
            {categoriesList.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase();
              const categoryCount = products.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`group flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md border border-[#2D4F36]/30'
                      : 'bg-white/60 hover:bg-white border border-[#1B3022]/10 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? 'ring-4 ring-[#2D4F36] ring-offset-2 shadow-md'
                        : 'group-hover:scale-105 border-2 border-[#1B3022]/15'
                    }`}
                  >
                    <img
                      src={
                        cat.image ||
                        'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-serif font-bold text-center mt-2.5 transition-colors line-clamp-1 ${
                      isSelected
                        ? 'text-[#2D4F36]'
                        : 'text-[#1B3022] group-hover:text-[#2D4F36]'
                    }`}
                  >
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#1B3022]/50 font-medium">
                    {categoryCount} {categoryCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DEDICATED CATEGORY PAGE BANNER (When a Category is Selected) */}
        {selectedCategory !== 'All' && (
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#1B3022]/10 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {activeCategoryObj?.image && (
                <img
                  src={activeCategoryObj.image}
                  alt={selectedCategory}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#2D4F36] shrink-0 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              )}
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center space-x-1.5 text-[11px] text-[#1B3022]/60 font-semibold mb-1">
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className="hover:text-[#2D4F36] underline cursor-pointer"
                  >
                    Home
                  </button>
                  <ChevronRight className="w-3 h-3 text-[#1B3022]/40" />
                  <span className="text-[#2D4F36] font-bold">
                    {selectedCategory}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B3022]">
                  {selectedCategory}
                </h3>
                {activeCategoryObj?.description && (
                  <p className="text-xs text-[#1B3022]/70 max-w-xl mt-0.5">
                    {activeCategoryObj.description}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleCategorySelect('All')}
              className="px-4 py-2 bg-[#F1EFE7] hover:bg-[#2D4F36] hover:text-white text-[#1B3022] text-xs font-bold rounded-full transition-all flex items-center space-x-1.5 cursor-pointer self-end sm:self-center shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Categories</span>
            </button>
          </div>
        )}

        {/* 3. SEARCH & SORT CONTROLS BAR */}
        <div className="bg-[#F1EFE7] p-3.5 sm:p-4 rounded-2xl border border-[#1B3022]/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-[#1B3022]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plants, pots, fertilizers, seeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 rounded-xl text-xs text-[#1B3022] placeholder:text-[#1B3022]/40 border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
            />
          </div>

          {/* Sorting Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#1B3022]/70">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium text-[#1B3022] border border-[#1B3022]/15 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Count indicator */}
        <div className="flex justify-between items-center mb-6 text-xs text-[#1B3022]/70">
          <span>
            Showing <strong className="text-[#1B3022]">{filteredProducts.length}</strong> products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#2D4F36] underline hover:text-[#1B3022] cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {/* 4. PRODUCT CARDS GRID (2 COLUMNS PER ROW ON MOBILE, 3-4 ON DESKTOP) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F1EFE7] rounded-3xl border border-[#1B3022]/10 p-8">
            <AlertCircle className="w-12 h-12 text-[#2D4F36] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif font-bold text-[#1B3022] mb-2">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : selectedCategory !== 'All'
                ? `No products in ${selectedCategory} yet`
                : 'No products found'}
            </h3>
            <p className="text-xs sm:text-sm text-[#1B3022]/60 max-w-md mx-auto mb-6">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Try searching with another keyword.`
                : selectedCategory !== 'All'
                ? `We are currently updating our nursery stock for ${selectedCategory}. Explore other categories or view all collection.`
                : 'No products match your current filters. Reset filters to view all nursery items.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="px-6 py-2.5 bg-[#2D4F36] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1B3022] transition-colors cursor-pointer shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#1B3022]/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2D4F36]/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Zoom & Badge */}
                <div
                  onClick={() => onViewDetails(product)}
                  className="relative aspect-square overflow-hidden bg-[#F1EFE7] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                    {product.featured && (
                      <span className="bg-[#2D4F36] text-white text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Bestseller</span>
                      </span>
                    )}
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#1B3022] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1B3022]/10">
                      {product.availability}
                    </span>
                  </div>

                  {/* Quick View Hover Button (Desktop) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                    <span className="bg-white text-[#1B3022] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div>
                    {/* Category Label */}
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold text-[#2D4F36] block mb-0.5">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3
                      onClick={() => onViewDetails(product)}
                      className="text-xs sm:text-base font-serif font-bold text-[#1B3022] line-clamp-1 sm:line-clamp-2 hover:text-[#2D4F36] cursor-pointer transition-colors"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Short Description (Hidden on mobile for clean 2-column height) */}
                    <p className="hidden sm:block text-xs text-[#1B3022]/70 line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-2 sm:pt-3 border-t border-[#1B3022]/10 flex items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[9px] sm:text-xs text-[#1B3022]/60 block -mb-0.5">Price</span>
                      <span className="text-xs sm:text-lg font-serif font-extrabold text-[#1B3022]">
                        ₹{product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#2D4F36] hover:bg-[#1B3022] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full transition-all duration-200 flex items-center space-x-1 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden xs:inline sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
