import React, { useState } from 'react';
import { Product } from '../types';
import {
  X,
  Sun,
  Droplets,
  Layers,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  Maximize2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyWhatsApp: (product: Product, quantity: number) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyWhatsApp,
  allProducts,
  onSelectProduct,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Related products from same category or random
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category.includes('Plants')))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="relative bg-[#F9F8F3] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#1B3022]/15 my-8 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#F9F8F3]/95 backdrop-blur-md z-20 px-6 py-4 border-b border-[#1B3022]/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold bg-[#2D4F36] text-white px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-[#1B3022]/60 font-medium hidden sm:inline">
              Plant Specification Sheet
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#1B3022] hover:bg-[#1B3022]/10 rounded-full transition-colors focus:outline-none"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#1B3022]/10 shadow-inner group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#2D4F36] scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-2 gap-3 bg-[#F1EFE7] p-4 rounded-xl border border-[#1B3022]/10 text-xs text-[#1B3022]">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="opacity-60 block text-[10px]">Sunlight</span>
                    <span className="font-semibold">{product.sunlight}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="opacity-60 block text-[10px]">Watering</span>
                    <span className="font-semibold line-clamp-1">{product.watering}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="opacity-60 block text-[10px]">Climate</span>
                    <span className="font-semibold line-clamp-1">{product.suitableClimate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D4F36] shrink-0" />
                  <div>
                    <span className="opacity-60 block text-[10px]">Plant Size</span>
                    <span className="font-semibold">{product.plantSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B3022] leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-xs text-[#2D4F36] font-semibold uppercase tracking-widest mb-3">
                  Category: {product.category} &bull; {product.availability}
                </p>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-serif font-extrabold text-[#1B3022]">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-[#1B3022]/60">Inclusive of all taxes</span>
                </div>
              </div>

              <div className="border-t border-b border-[#1B3022]/10 py-4 space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#1B3022]">
                  Description
                </h4>
                <p className="text-sm text-[#1B3022]/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B3022]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#1B3022]/20 rounded-full bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 hover:bg-[#1B3022]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#1B3022] font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-xs text-[#1B3022] min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      disabled={quantity >= 99}
                      className="px-3 py-1.5 hover:bg-[#1B3022]/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#1B3022] font-bold text-sm"
                      title={quantity >= 99 ? 'Maximum quantity is 99' : 'Increase quantity'}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="w-full py-3.5 px-4 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyWhatsApp(product, quantity);
                    }}
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Buy on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Uses & Growing Conditions */}
              <div className="space-y-3 pt-2">
                <div className="bg-[#F1EFE7] p-3.5 rounded-xl border border-[#1B3022]/10 text-xs">
                  <strong className="text-[#1B3022] block mb-1">Key Uses:</strong>
                  <span className="text-[#1B3022]/80">{product.uses}</span>
                </div>

                <div className="bg-[#F1EFE7] p-3.5 rounded-xl border border-[#1B3022]/10 text-xs">
                  <strong className="text-[#1B3022] block mb-1">Growing Conditions:</strong>
                  <span className="text-[#1B3022]/80">{product.growingConditions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plant Care & Specs Accordion Grid */}
          <div className="border-t border-[#1B3022]/10 pt-6">
            <h3 className="text-lg font-serif font-bold text-[#1B3022] mb-4">
              Comprehensive Growth & Care Guide
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                  Soil Requirement
                </span>
                <p className="text-[#1B3022]/80 leading-relaxed">{product.soilType}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                  Fertilizer Recommendation
                </span>
                <p className="text-[#1B3022]/80 leading-relaxed">{product.fertilizer}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                  Growth & Maintenance Tips
                </span>
                <p className="text-[#1B3022]/80 leading-relaxed">{product.growthTips}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                  Suitable Climate
                </span>
                <p className="text-[#1B3022]/80 leading-relaxed">{product.suitableClimate}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#1B3022]/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4F36] block">
                  Availability
                </span>
                <p className="text-[#1B3022]/80 font-bold">{product.availability}</p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-[#1B3022]/10 pt-6">
              <h4 className="text-base font-serif font-bold text-[#1B3022] mb-4">
                You May Also Like
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="bg-white rounded-xl p-3 border border-[#1B3022]/10 flex items-center space-x-3 cursor-pointer hover:border-[#2D4F36] transition-colors"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-serif font-bold text-[#1B3022] truncate">
                        {rel.name}
                      </h5>
                      <span className="text-xs font-bold text-[#2D4F36] block mt-0.5">
                        ₹{rel.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
