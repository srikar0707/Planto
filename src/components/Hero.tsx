import React from 'react';
import { ShoppingCart, Leaf, PhoneCall, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { WebsiteSettings } from '../types';

interface HeroProps {
  settings: WebsiteSettings;
  onShopNow: () => void;
  onExplorePlants: () => void;
  onContactUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onShopNow,
  onExplorePlants,
  onContactUs,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-[#F9F8F3]"
    >
      {/* Background Organic Floating Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#A3B18A]/15 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-[#2D4F36]/10 rounded-full blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* Floating Animated Leaf SVGs */}
      <div className="absolute top-1/6 left-8 sm:left-24 opacity-25 animate-float pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-24 sm:h-24 text-[#2D4F36] fill-current">
          <path d="M50 0 C20 30 0 60 50 100 C100 60 80 30 50 0 Z" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-8 sm:right-28 opacity-20 animate-float-reverse pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-28 sm:h-28 text-[#2D4F36] fill-current">
          <path d="M50 0 C10 40 10 70 50 100 C90 70 90 40 50 0 Z" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-12 sm:right-1/6 opacity-15 animate-leaf-sway pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#A3B18A] fill-current">
          <path d="M17,8C8,10 59,16 17,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Decorative Ring Accent */}
        <div className="w-16 h-16 mb-6 border border-[#2D4F36]/30 rounded-full flex items-center justify-center p-2 opacity-80">
          <div className="w-full h-full border border-[#2D4F36] rounded-full animate-pulse flex items-center justify-center">
            <Leaf className="w-4 h-4 text-[#2D4F36]" />
          </div>
        </div>

        {/* Trilingual Slogan Section */}
        <div className="space-y-2 mb-8 bg-[#F1EFE7]/80 backdrop-blur-sm px-6 py-4 sm:px-10 sm:py-5 rounded-2xl border border-[#1B3022]/10 shadow-sm">
          {/* English Slogan */}
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#5A6351] tracking-wide">
            {settings.sloganEnglish}
          </p>

          {/* Hindi Slogan */}
          <p className="text-base sm:text-lg md:text-xl font-devanagari font-semibold text-[#2D4F36] tracking-wide">
            {settings.sloganHindi}
          </p>

          {/* Telugu Slogan - Highlighted slightly larger as per specification */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-telugu font-bold text-[#1B3022] mt-2 drop-shadow-sm leading-snug">
            {settings.sloganTelugu}
          </p>
        </div>

        {/* Short Tagline */}
        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-bold text-[#2D4F36]/90 mb-10 max-w-2xl leading-relaxed">
          &ldquo;{settings.heroTagline}&rdquo;
        </p>

        {/* Interactive Animated Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {/* Shop Now Button */}
          <button
            onClick={onShopNow}
            className="group px-8 py-4 bg-[#2D4F36] text-[#F9F8F3] text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#1B3022] shadow-xl shadow-[#2D4F36]/25 hover:shadow-2xl hover:shadow-[#1B3022]/35 transition-all duration-300 flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Shop Now</span>
          </button>

          {/* Explore Plants Button */}
          <button
            onClick={onExplorePlants}
            className="group px-8 py-4 border-2 border-[#2D4F36] text-[#2D4F36] text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#2D4F36] hover:text-white transition-all duration-300 flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Leaf className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Explore Plants</span>
          </button>

          {/* Contact Us Button */}
          <button
            onClick={onContactUs}
            className="group px-8 py-4 bg-[#F1EFE7] border border-[#1B3022]/20 text-[#1B3022] text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#1B3022] hover:text-white transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[11px] uppercase tracking-widest font-bold text-[#1B3022]/70">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#2D4F36] rounded-full"></span>
            <span>100% Healthy Nursery Plants</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#2D4F36] rounded-full"></span>
            <span>Expert Gardening Advice</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#2D4F36] rounded-full"></span>
            <span>Doorstep Safe Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};
