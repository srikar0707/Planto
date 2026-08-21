import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Shield, Phone, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { WebsiteSettings } from '../types';

interface HeaderProps {
  settings: WebsiteSettings;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  isAdmin,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollYRef = React.useRef(0);
  const mobileMenuOpenRef = React.useRef(mobileMenuOpen);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      const scrollDiff = currentScrollY - prevScrollY;

      // Keep header visible at the top
      if (currentScrollY <= 60) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);

        // Hide on downward scroll with clean threshold, show on upward scroll
        if (!mobileMenuOpenRef.current) {
          if (scrollDiff > 12) {
            setIsVisible(false);
          } else if (scrollDiff < -10) {
            setIsVisible(true);
          }
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Landscaping', href: '#landscaping' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (link: { href: string; category?: string }) => {
    setMobileMenuOpen(false);
    setIsVisible(true);
    if (link.category) {
      onSelectCategory(link.category);
    }
    setTimeout(() => {
      const element = link.category
        ? document.querySelector('#catalog-items-section') || document.querySelector(link.href)
        : document.querySelector(link.href);
      if (element) {
        const headerOffset = 65;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-out will-change-transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Compact Banner */}
      <div className="bg-[#1B3022] text-[#F9F8F3] text-[11px] sm:text-xs py-1.5 px-4 text-center flex items-center justify-between font-medium">
        <div className="hidden md:flex items-center space-x-2 text-[11px] opacity-80">
          <Sparkles className="w-3.5 h-3.5 text-[#A3B18A]" />
          <span>Organic Plants & Landscaping Solutions across India</span>
        </div>
        <div className="mx-auto md:mx-0 text-[11px] tracking-wide">
          <span>WhatsApp Enquiries & Orders: </span>
          <a
            href={`https://wa.me/${settings.whatsAppNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-[#A3B18A] hover:text-white transition-colors"
          >
            {settings.contactPhone}
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-[11px]">
          <span>Mon-Sun 8AM - 8PM</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full border-b border-[#1B3022]/10 backdrop-blur-md transition-colors duration-200 py-2.5 sm:py-3 ${
          isScrolled
            ? 'bg-[#F9F8F3]/95 shadow-sm'
            : 'bg-[#F9F8F3]/90'
        }`}
      >
        <div className="w-full max-w-[98%] mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo - Prominent & Noticeable */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group focus:outline-none shrink-0 pr-2 transition-transform duration-200 hover:scale-105"
          >
            <Logo size="lg" customLogoUrl={settings.logoUrl} align="left" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 text-xs uppercase tracking-wider font-extrabold text-[#1B3022]">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="hover:text-[#2D4F36] hover:bg-[#2D4F36]/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-[#1B3022] hover:text-[#2D4F36] rounded-full hover:bg-[#1B3022]/5 transition-colors focus:outline-none"
              title="Search Plants & Products"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Button with Counter */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-[#1B3022] hover:text-[#2D4F36] rounded-full hover:bg-[#1B3022]/5 transition-colors focus:outline-none"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2D4F36] text-white text-[9px] font-extrabold w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-1.5 rounded-full transition-colors ${
                isAdmin
                  ? 'bg-[#2D4F36] text-white'
                  : 'text-[#1B3022] hover:text-[#2D4F36] hover:bg-[#1B3022]/5'
              }`}
              title={isAdmin ? 'Admin Dashboard Active' : 'Admin Login'}
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#1B3022] hover:bg-[#1B3022]/5 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F9F8F3] border-b border-[#1B3022]/15 px-6 py-5 space-y-3 shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B3022]">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="text-left py-2.5 px-3 rounded-lg hover:bg-[#2D4F36] hover:text-white transition-all border-b border-[#1B3022]/5"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="pt-4 border-t border-[#1B3022]/10 flex justify-between items-center text-xs">
              <span className="opacity-70">Admin Panel:</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="px-3 py-1.5 bg-[#1B3022] text-white rounded-md font-bold"
              >
                {isAdmin ? 'Manage Store' : 'Admin Login'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
