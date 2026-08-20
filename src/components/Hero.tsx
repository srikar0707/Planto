import React from 'react';
import {
  ShoppingCart,
  Compass,
  PhoneCall,
  Sprout,
  Award,
  Truck,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { WebsiteSettings } from '../types';
import { HeroNatureCanvas } from './HeroNatureCanvas';

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
      className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col items-center justify-between text-center px-4 sm:px-6 lg:px-8 pt-10 pb-8 overflow-hidden bg-[#1B3022]"
    >
      {/* 1. PHOTOREALISTIC NURSERY BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-105 pointer-events-none"
        style={{
          backgroundImage: 'url(/hero-garden.jpg)',
        }}
      >
        {/* Soft Contrast Gradient Overlay to keep text perfectly legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3022]/30 via-transparent to-[#1B3022]/40" />
      </div>

      {/* 2. REALISTIC NATURE ANIMATION CANVAS (Waterfall, Water Splashes, Ripples, Birds, Drifting Leaves, Sunbeams) */}
      <HeroNatureCanvas />

      {/* Top spacer for balanced vertical alignment */}
      <div className="w-full h-6 sm:h-10" />

      {/* 3. CENTRAL TRILINGUAL SLOGAN & CTA CARD (Completely Stable UI Layer) */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center my-auto">
        {/* Trilingual Slogan Card */}
        <div className="w-full bg-[#FAF8F2]/95 backdrop-blur-md px-6 py-6 sm:px-12 sm:py-8 rounded-3xl border border-[#1B3022]/15 shadow-2xl shadow-black/20 text-center transform transition-all duration-300 hover:shadow-3xl">
          {/* English Slogan */}
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#4A5D4E] tracking-wider mb-2 font-medium">
            {settings.sloganEnglish || 'Vruksho Rakshati Rakshitah'}
          </p>

          {/* Hindi Slogan (Devanagari) */}
          <p className="text-lg sm:text-xl md:text-2xl font-devanagari font-bold text-[#2D4F36] tracking-wide mb-3">
            {settings.sloganHindi || 'वृक्षो रक्षति रक्षितः'}
          </p>

          {/* Telugu Slogan - Highlighted & Bold */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-telugu font-black text-[#1B3022] drop-shadow-sm leading-tight tracking-normal mb-1">
            {settings.sloganTelugu || 'వృక్షో రక్షతి రక్షితః'}
          </p>
        </div>

        {/* Short Tagline with Decorative Dividers */}
        <div className="mt-8 mb-7 flex items-center justify-center space-x-3 w-full">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#1B3022]/60" />
          <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] font-extrabold text-[#1B3022] text-center drop-shadow-sm bg-[#FAF8F2]/75 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#1B3022]/10">
            &ldquo;{settings.heroTagline || 'BRINGING NATURE CLOSER TO EVERY HOME'}&rdquo;
          </p>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#1B3022]/60" />
        </div>

        {/* 3 Interactive CTA Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full">
          {/* Shop Now Button */}
          <button
            onClick={onShopNow}
            className="group px-6 sm:px-8 py-3.5 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs sm:text-xs uppercase tracking-widest font-extrabold rounded-full shadow-lg shadow-[#2D4F36]/30 hover:shadow-xl transition-all duration-300 flex items-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Shop Now</span>
          </button>

          {/* Explore Plants Button */}
          <button
            onClick={onExplorePlants}
            className="group px-6 sm:px-8 py-3.5 bg-[#FAF8F2]/90 hover:bg-white text-[#1B3022] border border-[#1B3022]/20 text-xs sm:text-xs uppercase tracking-widest font-extrabold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-[#2D4F36] group-hover:rotate-45 transition-transform" />
            <span>Explore Plants</span>
          </button>

          {/* Contact Us Button */}
          <button
            onClick={onContactUs}
            className="group px-6 sm:px-8 py-3.5 bg-[#FAF8F2]/90 hover:bg-white text-[#1B3022] border border-[#1B3022]/20 text-xs sm:text-xs uppercase tracking-widest font-extrabold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-4 h-4 text-[#2D4F36] group-hover:scale-110 transition-transform" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* 4. BOTTOM FEATURE BAR (Wide Variety, Premium Quality, Safe Delivery, Expert Support) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-10">
        <div className="bg-[#FAF8F2]/95 backdrop-blur-md rounded-3xl border border-[#1B3022]/15 shadow-xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1B3022]/10">
          {/* Card 1: Wide Variety */}
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Sprout className="w-5 h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Wide Variety
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                1000+ Plants to choose from
              </p>
            </div>
          </div>

          {/* Card 2: Premium Quality */}
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Award className="w-5 h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Premium Quality
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Healthy & Carefully Nurtured
              </p>
            </div>
          </div>

          {/* Card 3: Safe Delivery */}
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Truck className="w-5 h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Safe Delivery
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Secure Packaging Across India
              </p>
            </div>
          </div>

          {/* Card 4: Expert Support */}
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <HeartHandshake className="w-5 h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Expert Support
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Gardening Guidance Every Step
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
