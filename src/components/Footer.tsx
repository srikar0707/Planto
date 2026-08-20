import React, { useState } from 'react';
import { WebsiteSettings } from '../types';
import { Logo } from './Logo';
import { MessageCircle, Instagram, Facebook, Shield, Heart } from 'lucide-react';

interface FooterProps {
  settings: WebsiteSettings;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onSelectCategory }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'All Plants', href: '#products', category: 'Plants' },
    { name: 'Landscaping & Gardening', href: '#landscaping' },
    { name: 'About PlantO', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const plantCategories = [
    'Indoor Plants',
    'Flower Plants',
    'Fruit Plants',
    'Bonsai Plants',
    'Cactus Plants',
    'Pebbles',
    'Seeds',
    'Soil & Manure',
  ];

  return (
    <footer className="bg-[#122116] text-[#F9F8F3] pt-16 pb-8 border-t border-[#1B3022]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/90 p-3 rounded-2xl inline-block">
              <Logo size="sm" customLogoUrl={settings.logoUrl} />
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              PlantO provides healthy, acclimatized nursery plants, artisanal pots, organic fertilizers, and turnkey landscaping services across India.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={settings.instagramUrl || 'https://instagram.com/plant_o_nursery'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#2D4F36] rounded-full transition-colors cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={settings.facebookUrl || 'https://facebook.com/plantonursery'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#2D4F36] rounded-full transition-colors cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3B18A]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={() => link.category && onSelectCategory(link.category)}
                    className="hover:text-[#A3B18A] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plant Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3B18A]">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {plantCategories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.querySelector('#products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#A3B18A] transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A3B18A]">
              Nursery Office
            </h4>
            <div className="space-y-2 text-xs text-white/80 leading-relaxed">
              <p>{settings.contactAddress}</p>
              <p className="font-bold text-white">Phone: {settings.contactPhone}</p>
              <p>Email: {settings.contactEmail}</p>
              <p className="text-[11px] text-[#A3B18A]">{settings.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} PlantO Nursery Gardens. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Privacy & Terms */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#F9F8F3] text-[#1B3022] max-w-lg w-full p-6 sm:p-8 rounded-3xl relative shadow-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 hover:bg-[#1B3022]/10 rounded-full text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-serif font-bold mb-4">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="text-xs text-[#1B3022]/80 space-y-3 max-h-80 overflow-y-auto pr-2">
              <p>
                PlantO Nursery respects your privacy and is committed to protecting your personal information.
              </p>
              <p>
                1. Order details submitted through WhatsApp or our contact forms are strictly used for delivery and customer consultation.
              </p>
              <p>
                2. We do not store sensitive payment cards or share contact numbers with third-party advertisers.
              </p>
              <p>
                3. Plant guarantees apply to healthy nursery deliveries. If any plant arrives damaged, notify us within 24 hours on WhatsApp for replacement.
              </p>
            </div>

            <button
              onClick={() => setModalType(null)}
              className="mt-6 w-full py-2.5 bg-[#2D4F36] text-white text-xs font-bold rounded-full"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
