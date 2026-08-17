import React, { useState, useEffect } from 'react';
import { WebsiteSettings } from '../types';
import { HeartHandshake, ShieldCheck, Award, Users, Sprout, CheckCircle2 } from 'lucide-react';

interface AboutUsSectionProps {
  settings: WebsiteSettings;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ settings }) => {
  // Animated counters state
  const [counts, setCounts] = useState({
    customers: 0,
    plants: 0,
    projects: 0,
    years: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        customers: Math.min(12500, Math.floor(12500 * progress)),
        plants: Math.min(48000, Math.floor(48000 * progress)),
        projects: Math.min(850, Math.floor(850 * progress)),
        years: Math.min(15, Math.floor(15 * progress)),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-20 bg-[#F1EFE7] border-t border-b border-[#1B3022]/10 relative overflow-hidden">
      {/* Background Leaf Deco */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D4F36]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Decorative Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#1B3022]/20 shadow-2xl bg-white aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80"
                alt="PlantO Nursery Gardens"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-white space-y-1">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#A3B18A]">
                    Established 2011
                  </span>
                  <h4 className="text-2xl font-serif font-bold">PlantO Nursery Gardens</h4>
                  <p className="text-xs text-white/80">Cultivating organic green spaces with love and science.</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-[#2D4F36] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/20">
              <div className="flex items-center space-x-3">
                <Sprout className="w-8 h-8 text-[#A3B18A] shrink-0" />
                <div>
                  <span className="text-xs font-bold block">Organic Guarantee</span>
                  <p className="text-[10px] text-white/80">100% acclimatized pesticide-free nursery plants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
                Our Mission & Vision
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022] leading-tight">
                About PlantO Nursery
              </h2>
              <div className="w-20 h-1 bg-[#2D4F36] mt-4 mb-6"></div>
            </div>

            {/* Mission Quote Box */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-l-4 border-[#2D4F36] shadow-sm">
              <p className="text-base sm:text-lg font-serif italic text-[#1B3022] leading-relaxed">
                &ldquo;{settings.aboutUsMission}&rdquo;
              </p>
            </div>

            {/* Core Values Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#1B3022]">
              <div className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-[#1B3022]/10">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F36] shrink-0" />
                <span>Healthy, Pest-Free Acclimatized Plants</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-[#1B3022]/10">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F36] shrink-0" />
                <span>Expert Botanical Guidance & Support</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-[#1B3022]/10">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F36] shrink-0" />
                <span>Custom Landscaping & Vertical Gardens</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3.5 rounded-xl border border-[#1B3022]/10">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F36] shrink-0" />
                <span>Eco-friendly Recyclable Pots & Accessories</span>
              </div>
            </div>

            {/* Animated Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1B3022]/15">
              <div className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2D4F36] block">
                  {counts.customers.toLocaleString()}+
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1B3022]/60 mt-1 block">
                  Happy Customers
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2D4F36] block">
                  {counts.plants.toLocaleString()}+
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1B3022]/60 mt-1 block">
                  Plants Sold
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2D4F36] block">
                  {counts.projects}+
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1B3022]/60 mt-1 block">
                  Projects Completed
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#1B3022]/10 text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2D4F36] block">
                  {counts.years}+
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1B3022]/60 mt-1 block">
                  Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
