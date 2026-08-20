import React, { useState } from 'react';
import { LandscapingService, WebsiteSettings } from '../types';
import { INITIAL_SERVICES } from '../data/initialData';
import { CompletedProjectsCarousel } from './CompletedProjectsCarousel';
import {
  Home,
  Building,
  Layers,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Trees,
  HelpCircle,
  MessageCircle,
  Check,
  Send,
  Sparkle
} from 'lucide-react';

interface LandscapingSectionProps {
  settings: WebsiteSettings;
  onEnquireService?: (service: LandscapingService) => void;
}

export const LandscapingSection: React.FC<LandscapingSectionProps> = ({
  settings,
}) => {
  const [selectedServiceForModal, setSelectedServiceForModal] =
    useState<LandscapingService | null>(null);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDetails, setEnquiryDetails] = useState('');

  const servicesList: LandscapingService[] =
    settings.services && settings.services.length > 0
      ? settings.services
      : INITIAL_SERVICES;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-[#2D4F36]" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#2D4F36]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#2D4F36]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#2D4F36]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#2D4F36]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#2D4F36]" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-[#2D4F36]" />;
      default:
        return <HelpCircle className="w-6 h-6 text-[#2D4F36]" />;
    }
  };

  const handleSendEnquiryWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceForModal) return;

    const message = `Hello PlantO,

I am interested in your *${selectedServiceForModal.title}* landscaping & gardening services.

Name: ${enquiryName || 'Not provided'}
Phone: ${enquiryPhone || 'Not provided'}
Project Details: ${enquiryDetails || 'Please contact me for site inspection.'}

Please schedule a consultation callback.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.whatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setSelectedServiceForModal(null);
    setEnquiryName('');
    setEnquiryPhone('');
    setEnquiryDetails('');
  };

  return (
    <section id="landscaping" className="py-20 bg-[#F9F8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#2D4F36] opacity-80 block mb-2">
            {settings.landscapingTagline || 'Professional Turnkey Services'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3022]">
            {settings.landscapingTitle || 'Landscaping & Gardening Works'}
          </h2>
          <div className="w-16 h-0.5 bg-[#2D4F36] mx-auto mt-4 mb-4"></div>
          <p className="text-sm text-[#1B3022]/70 max-w-2xl mx-auto whitespace-pre-line">
            {settings.landscapingDescription ||
              'From residential terrace gardens and vertical green walls to commercial office biophilia and estate lawns, our landscape architects bring natural serenity to every space.'}
          </p>
        </div>

        {/* Optional Section Showcase / Highlight Image */}
        {settings.landscapingImage && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-[#1B3022]/10 relative group">
            <div className="aspect-[21/9] sm:aspect-[24/9] w-full bg-[#1B3022]">
              <img
                src={settings.landscapingImage}
                alt="Landscaping & Gardening Works Showcase"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 opacity-90"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10">
              <div className="space-y-2 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#E3F2E6]">
                  <Sparkle className="w-3 h-3 text-[#A7F3D0]" />
                  <span>Custom Landscape Architecture & Execution</span>
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#F9F8F3]">
                  {settings.landscapingTitle || 'Landscaping & Gardening Works'}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#1B3022]/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2D4F36]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Icon Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F1EFE7]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-sm border border-[#1B3022]/10">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#1B3022]">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#1B3022]/70 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-[#1B3022]/10">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-[11px] text-[#1B3022]/80">
                        <Check className="w-3.5 h-3.5 text-[#2D4F36] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Enquiry Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedServiceForModal(service)}
                  className="w-full py-3 px-4 bg-[#F1EFE7] hover:bg-[#2D4F36] text-[#1B3022] hover:text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 border border-[#1B3022]/15 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Projects Side-Swipe Carousel Panel */}
        <CompletedProjectsCarousel settings={settings} />
      </div>

      {/* Service Enquiry Modal */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-[#F9F8F3] w-full max-w-lg rounded-3xl shadow-2xl border border-[#1B3022]/15 p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#1B3022]/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D4F36]">
                  Landscaping Enquiry
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1B3022]">
                  {selectedServiceForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="p-2 hover:bg-[#1B3022]/10 rounded-full text-[#1B3022] cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSendEnquiryWhatsApp} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Varma"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#1B3022]/20 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={enquiryPhone}
                  onChange={(e) => setEnquiryPhone(e.target.value)}
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#1B3022]/20 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3022] mb-1">
                  Garden / Site Location & Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your site size, terrace dimensions or service needs..."
                  value={enquiryDetails}
                  onChange={(e) => setEnquiryDetails(e.target.value)}
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#1B3022]/20 text-xs text-[#1B3022] focus:outline-none focus:border-[#2D4F36]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
