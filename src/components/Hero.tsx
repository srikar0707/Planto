import React from 'react';
import {
  ShoppingCart,
  Compass,
  PhoneCall,
  Sprout,
  Award,
  Truck,
  HeartHandshake,
} from 'lucide-react';
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
      className="relative min-h-[85vh] lg:min-h-[92vh] flex flex-col items-center justify-between text-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-hidden bg-[#FAF8F2]"
    >
      {/* 1. PHOTOREALISTIC STATIC BOTANICAL NURSERY BACKGROUND */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: 'url(/hero-garden.jpg)',
        }}
      >
        {/* Soft high-key ambient light gradient ensuring optimal text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#FAF8F2]/30" />
      </div>

      {/* Top spacer for responsive balance */}
      <div className="w-full h-2 sm:h-6" />

      {/* 2. CENTRAL SLOGAN & CTA CONTENT (Completely Static, High-Contrast & Centered) */}
      <div className="relative z-10 max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center my-auto px-2">
        {/* Trilingual Slogan Card */}
        <div className="w-full bg-[#FAF8F2]/90 backdrop-blur-md px-6 py-6 sm:px-10 sm:py-7 rounded-3xl border border-[#1B3022]/15 shadow-xl shadow-[#1B3022]/5 text-center">
          {/* English Slogan */}
          <p className="text-xs sm:text-sm md:text-base font-serif italic text-[#4A5D4E] tracking-wider mb-2 font-medium">
            {settings.sloganEnglish || 'Vruksho Rakshati Rakshitah'}
          </p>

          {/* Hindi Slogan (Devanagari) */}
          <p className="text-base sm:text-lg md:text-xl font-devanagari font-bold text-[#2D4F36] tracking-wide mb-2.5">
            {settings.sloganHindi || 'वृक्षो रक्षति रक्षितः'}
          </p>

          {/* Telugu Slogan - Highlighted & Bold */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-telugu font-black text-[#1B3022] drop-shadow-sm leading-tight tracking-normal mb-0.5">
            {settings.sloganTelugu || 'వృక్షో రక్షతి రక్షితః'}
          </p>
        </div>

        {/* Short Tagline with Subtle Botanical Accents */}
        <div className="mt-6 sm:mt-7 mb-6 sm:mb-7 flex items-center justify-center space-x-2 sm:space-x-3 w-full">
          <div className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent to-[#1B3022]/40" />
          <p className="text-[10px] sm:text-xs md:text-xs uppercase tracking-[0.25em] font-extrabold text-[#1B3022] text-center bg-[#FAF8F2]/80 backdrop-blur-sm px-3.5 sm:px-4 py-1.5 rounded-full border border-[#1B3022]/10 shadow-sm">
            &ldquo;{settings.heroTagline || 'BRINGING NATURE CLOSER TO EVERY HOME.'}&rdquo;
          </p>
          <div className="h-[1px] w-6 sm:w-14 bg-gradient-to-l from-transparent to-[#1B3022]/40" />
        </div>

        {/* 3 Interactive CTA Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-4 w-full">
          {/* Shop Now Button */}
          <button
            onClick={onShopNow}
            className="group px-6 sm:px-7 py-3 bg-[#2D4F36] hover:bg-[#1B3022] text-white text-xs uppercase tracking-widest font-extrabold rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>Shop Now</span>
          </button>

          {/* Explore Plants Button */}
          <button
            onClick={onExplorePlants}
            className="group px-6 sm:px-7 py-3 bg-[#FAF8F2]/95 hover:bg-white text-[#1B3022] border border-[#1B3022]/20 text-xs uppercase tracking-widest font-extrabold rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-[#2D4F36] group-hover:rotate-45 transition-transform" />
            <span>Explore Plants</span>
          </button>

          {/* Contact Us Button */}
          <button
            onClick={onContactUs}
            className="group px-6 sm:px-7 py-3 bg-[#FAF8F2]/95 hover:bg-white text-[#1B3022] border border-[#1B3022]/20 text-xs uppercase tracking-widest font-extrabold rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#2D4F36] group-hover:scale-110 transition-transform" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* 3. BOTTOM FEATURE BAR (Wide Variety, Premium Quality, Safe Delivery, Expert Support) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-8 sm:mt-10">
        <div className="bg-[#FAF8F2]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#1B3022]/15 shadow-lg p-3.5 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1B3022]/10">
          {/* Card 1: Wide Variety */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Wide Variety
              </h4>
              <p className="text-[9px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                1000+ Plants to choose from
              </p>
            </div>
          </div>

          {/* Card 2: Premium Quality */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Premium Quality
              </h4>
              <p className="text-[9px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Healthy & Carefully Nurtured
              </p>
            </div>
          </div>

          {/* Card 3: Safe Delivery */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Safe Delivery
              </h4>
              <p className="text-[9px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Secure Packaging Across India
              </p>
            </div>
          </div>

          {/* Card 4: Expert Support */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 pt-2 sm:pt-0 sm:px-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#2D4F36]/10 flex items-center justify-center shrink-0 border border-[#2D4F36]/20">
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D4F36]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B3022] leading-tight">
                Expert Support
              </h4>
              <p className="text-[9px] sm:text-[11px] text-[#1B3022]/65 leading-tight mt-0.5">
                Gardening Guidance Every Step
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
