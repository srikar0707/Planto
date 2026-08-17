import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

interface FloatingWidgetsProps {
  whatsAppNumber: string;
}

export const BackToTop: React.FC<FloatingWidgetsProps> = ({ whatsAppNumber }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end pointer-events-none">
      {/* Floating WhatsApp Quick Link */}
      <a
        href={`https://wa.me/${whatsAppNumber}?text=Hello%20PlantO,%20I%20would%20like%20to%20enquire%20about%20plants.`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto p-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat with PlantO
        </span>
      </a>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 bg-[#1B3022] hover:bg-[#2D4F36] text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
