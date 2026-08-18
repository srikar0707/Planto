import React from 'react';
import { WebsiteSettings } from '../types';
import { Sprout, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface AboutUsSectionProps {
  settings: WebsiteSettings;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ settings }) => {
  const defaultPoints = [
    '100% Acclimatized & Pest-Free Plants',
    'Expert Horticultural Consultation & Care Support',
    'Turnkey Residential & Commercial Landscaping',
    'Eco-Friendly Pots, Organic Soil & Nutrients',
  ];

  const pointsList =
    settings.aboutUsPoints && settings.aboutUsPoints.length > 0
      ? settings.aboutUsPoints
      : defaultPoints;

  const aboutPhoto =
    settings.aboutUsImage ||
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80';

  return (
    <section id="about" className="py-20 bg-[#F1EFE7] border-t border-b border-[#1B3022]/10 relative overflow-hidden">
      {/* Background Leaf Deco */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D4F36]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D4F36]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image & Decorative Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#1B3022]/20 shadow-2xl bg-white aspect-[4/5] group">
              <img
                src={aboutPhoto}
                alt={settings.companyName || 'PlantO Nursery Gardens'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022]/85 via-[#1B3022]/20 to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white space-y-1">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#A7F3D0]">
                    {settings.aboutUsEstablished || 'Established 2011'}
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-[#F9F8F3]">
                    {settings.companyName || 'PlantO Nursery Gardens'}
                  </h4>
                  <p className="text-xs text-[#F9F8F3]/80 leading-relaxed">
                    {settings.sloganEnglish || 'Vruksho Rakshati Rakshitah'}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-[#2D4F36] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/20">
              <div className="flex items-center space-x-3">
                <Sprout className="w-8 h-8 text-[#A7F3D0] shrink-0" />
                <div>
                  <span className="text-xs font-bold block">100% Organic Quality</span>
                  <p className="text-[10px] text-white/80">Acclimatized pesticide-free nursery plants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
                {settings.aboutUsTagline || 'Our Mission & Heritage'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022] leading-tight">
                {settings.aboutUsTitle || 'About PlantO Nursery'}
              </h2>
              <div className="w-20 h-1 bg-[#2D4F36] mt-4 mb-6"></div>
            </div>

            {/* Mission Box */}
            <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-l-4 border-[#2D4F36] shadow-sm space-y-3">
              <p className="text-base sm:text-lg font-serif italic text-[#1B3022] leading-relaxed">
                &ldquo;{settings.aboutUsMission}&rdquo;
              </p>
              {settings.aboutUsStory && (
                <p className="text-xs text-[#1B3022]/75 leading-relaxed pt-2 border-t border-[#1B3022]/10 whitespace-pre-line">
                  {settings.aboutUsStory}
                </p>
              )}
            </div>

            {/* Core Values / Highlights Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#1B3022]">
              {pointsList.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-[#1B3022]/10 shadow-sm hover:border-[#2D4F36]/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2D4F36] shrink-0" />
                  <span className="text-xs text-[#1B3022] font-medium leading-snug">{point}</span>
                </div>
              ))}
            </div>

            {/* Ethos & Philosophy Pill Card */}
            <div className="bg-[#EAE7DC] p-5 rounded-2xl border border-[#1B3022]/10 flex items-center space-x-4">
              <div className="p-3 bg-[#2D4F36] text-white rounded-xl shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-sm text-[#1B3022]">
                  Dedicated to Greener Living
                </h5>
                <p className="text-xs text-[#1B3022]/70 mt-0.5">
                  Every plant nurtured at PlantO is handled with scientific horticulture methods to ensure longevity and vitality in your garden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
