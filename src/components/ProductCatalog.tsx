import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { Search, Filter, ShoppingBag, Eye, Star, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter products by category, search query, difficulty
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
          matchesCategory = product.category.toLowerCase() === selectedCategory.toLowerCase();
        }
      }

      // Difficulty match
      let matchesDifficulty = true;
      if (selectedDifficulty !== 'All') {
        matchesDifficulty = product.careDifficulty === selectedDifficulty;
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

      return matchesCategory && matchesDifficulty && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const plantSubcategories = [
    'Indoor Plants',
    'Flower Plants',
    'Fruit Plants',
    'Creeper Plants',
    'Bonsai Plants',
    'Gift Plants',
    'Cactus Plants',
  ];

  const otherSubcategories = [
    'Accessories',
    'Pots',
    'Pebbles',
    'Landscaping & Gardening',
    'Seeds',
    'Soil & Manure',
  ];

  return (
    <section id="products" className="py-16 bg-[#F9F8F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
            Curated Green Collection
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022]">
            Nursery Products & Plants
          </h2>
          <div className="w-16 h-0.5 bg-[#2D4F36] mx-auto mt-4 mb-4"></div>
          <p className="text-sm text-[#1B3022]/70 max-w-xl mx-auto">
            Explore healthy, organically grown plants, artisan pots, premium soil, seeds, and outdoor garden landscaping materials.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 space-y-6">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#1B3022]/10 pb-4">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#2D4F36] text-white shadow-md shadow-[#2D4F36]/20'
                  : 'bg-[#F1EFE7] text-[#1B3022] hover:bg-[#2D4F36]/10'
              }`}
            >
              All Collection
            </button>

            {/* Plants Master Tab */}
            <button
              onClick={() => onSelectCategory('Plants')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'Plants'
                  ? 'bg-[#2D4F36] text-white shadow-md shadow-[#2D4F36]/20'
                  : 'bg-[#F1EFE7] text-[#1B3022] hover:bg-[#2D4F36]/10'
              }`}
            >
              All Plants 🌿
            </button>

            {/* Individual Plant Categories */}
            {plantSubcategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D4F36] text-white shadow-sm'
                    : 'bg-[#F1EFE7]/80 text-[#1B3022]/80 hover:bg-[#2D4F36]/10 hover:text-[#1B3022]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Other Categories Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1B3022]/50 mr-2">
              Garden Essentials:
            </span>
            {otherSubcategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1B3022] text-white'
                    : 'bg-[#F1EFE7] text-[#1B3022] hover:bg-[#1B3022]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Care Filter, Sort controls */}
          <div className="bg-[#F1EFE7] p-4 rounded-2xl border border-[#1B3022]/10 flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#1B3022]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plants, seeds, fertilizers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-xl text-xs text-[#1B3022] placeholder:text-[#1B3022]/40 border border-[#1B3022]/15 focus:outline-none focus:border-[#2D4F36]"
              />
            </div>

            {/* Care Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#1B3022]/70">
                Care Level:
              </span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-white px-3 py-2 rounded-xl text-xs font-medium text-[#1B3022] border border-[#1B3022]/15 focus:outline-none"
              >
                <option value="All">All Care Levels</option>
                <option value="Easy">Easy Care 🟢</option>
                <option value="Moderate">Moderate 🟡</option>
                <option value="Expert">Expert 🔴</option>
              </select>
            </div>

            {/* Sorting Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#1B3022]/70">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white px-3 py-2 rounded-xl text-xs font-medium text-[#1B3022] border border-[#1B3022]/15 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
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
              className="text-[#2D4F36] underline hover:text-[#1B3022]"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
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
            <p className="text-sm text-[#1B3022]/60 max-w-md mx-auto mb-6">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Try searching with another name or keyword.`
                : selectedCategory !== 'All'
                ? `We are currently updating our stock for ${selectedCategory}. Explore other categories or view all products.`
                : 'No products match your current filter selections. Try resetting filters to explore our full nursery catalog.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-6 py-2.5 bg-[#2D4F36] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#1B3022] transition-colors cursor-pointer shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {product.featured && (
                      <span className="bg-[#2D4F36] text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Bestseller</span>
                      </span>
                    )}
                    <span
                      className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${
                        product.careDifficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : product.careDifficulty === 'Moderate'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {product.careDifficulty} Care
                    </span>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#1B3022] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#1B3022]/10">
                      {product.availability}
                    </span>
                  </div>

                  {/* Quick View Hover Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#1B3022] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2D4F36] block mb-1">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3
                      onClick={() => onViewDetails(product)}
                      className="text-base font-serif font-bold text-[#1B3022] line-clamp-1 hover:text-[#2D4F36] cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#1B3022]/70 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-3 border-t border-[#1B3022]/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#1B3022]/60 block -mb-0.5">Price</span>
                      <span className="text-lg font-serif font-extrabold text-[#1B3022]">
                        ₹{product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-200 flex items-center space-x-1.5 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
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
