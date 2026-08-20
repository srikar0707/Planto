import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CompletedProject, WebsiteSettings } from '../types';
import { INITIAL_COMPLETED_PROJECTS } from '../data/initialData';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Maximize2,
  X,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface CompletedProjectsCarouselProps {
  settings: WebsiteSettings;
}

export const CompletedProjectsCarousel: React.FC<CompletedProjectsCarouselProps> = ({
  settings,
}) => {
  const projects: CompletedProject[] =
    settings.completedProjects && settings.completedProjects.length > 0
      ? settings.completedProjects
      : INITIAL_COMPLETED_PROJECTS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<CompletedProject | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Drag & Swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, projects.length, nextSlide]);

  // Touch Handlers (Mobile Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchCurrentX(e.touches[0].clientX);
    const diff = e.touches[0].clientX - touchStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchCurrentX !== null) {
      const diff = touchCurrentX - touchStartX;
      const threshold = 45; // min swipe distance in px
      if (diff > threshold) {
        prevSlide();
      } else if (diff < -threshold) {
        nextSlide();
      }
    }
    setTouchStartX(null);
    setTouchCurrentX(null);
    setDragOffset(0);
    setIsPaused(false);
  };

  // Mouse Handlers (Desktop Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setTouchCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) return;
    setTouchCurrentX(e.clientX);
    const diff = e.clientX - touchStartX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (isDragging && touchStartX !== null && touchCurrentX !== null) {
      const diff = touchCurrentX - touchStartX;
      const threshold = 50;
      if (diff > threshold) {
        prevSlide();
      } else if (diff < -threshold) {
        nextSlide();
      }
    }
    setIsDragging(false);
    setTouchStartX(null);
    setTouchCurrentX(null);
    setDragOffset(0);
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  const handleWhatsAppEnquiry = (project: CompletedProject) => {
    const message = `Hello PlantO Nursery,

I am interested in a landscaping project similar to your completed project:
*${project.title}* (${project.category}${project.location ? ` - ${project.location}` : ''}).

Please share estimated timelines and consultation details for my space.`;

    const url = `https://wa.me/${settings.whatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex] || projects[0];

  return (
    <div className="mt-20 pt-16 border-t border-[#1B3022]/10" id="completed-projects">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#2D4F36]/10 text-[#2D4F36] px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2D4F36]" />
            <span>{settings.completedProjectsSubtitle || 'Real Transformations & Site Portfolios'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1B3022]">
            {settings.completedProjectsTitle || 'Our Completed Projects'}
          </h3>
          <p className="text-xs sm:text-sm text-[#1B3022]/70 mt-2 max-w-xl">
            Swipe through our portfolio of turnkey terrace gardens, vertical bio-walls, estate landscaping, and residential green spaces executed across Andhra Pradesh and Telangana.
          </p>
        </div>

        {/* Desktop Carousel Controls */}
        <div className="flex items-center space-x-3 self-end">
          <span className="text-xs font-bold text-[#1B3022]/60 hidden sm:inline-block">
            <strong className="text-[#2D4F36] text-sm">{currentIndex + 1}</strong> / {projects.length}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Project"
              className="p-3 rounded-full bg-white border border-[#1B3022]/15 text-[#1B3022] hover:bg-[#2D4F36] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Project"
              className="p-3 rounded-full bg-white border border-[#1B3022]/15 text-[#1B3022] hover:bg-[#2D4F36] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel Card Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`relative overflow-hidden select-none cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Sliding Viewport */}
        <div
          className="transition-transform ease-in-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transitionDuration: isDragging || touchStartX !== null ? '0ms' : '450ms',
            display: 'flex',
          }}
        >
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={project.id || idx}
                className="w-full shrink-0 px-1 sm:px-2"
                style={{
                  transition: 'opacity 450ms ease-in-out, transform 450ms ease-in-out',
                  opacity: isActive ? 1 : 0.88,
                  transform: isActive ? 'scale(1)' : 'scale(0.99)',
                }}
              >
                <div className="bg-white rounded-3xl border border-[#1B3022]/10 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[440px] md:min-h-[480px]">
                  {/* Left / Top: High-Res Project Image */}
                  <div className="relative lg:col-span-7 bg-[#1B3022] overflow-hidden group/img min-h-[280px] sm:min-h-[340px] lg:min-h-full">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 pointer-events-none"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />

                    {/* Image overlay with category & zoom trigger */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-between p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#2D4F36]/90 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                          {project.category}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxProject(project);
                          }}
                          className="p-2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-colors cursor-pointer shadow"
                          title="View High-Res Photo"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {project.location && (
                        <div className="flex items-center space-x-1.5 text-white/90 text-xs font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
                          <MapPin className="w-3.5 h-3.5 text-[#A7F3D0]" />
                          <span>{project.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right / Bottom: Project Details & Action */}
                  <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#F9F8F3]">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-[11px] font-bold text-[#2D4F36] uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-[#2D4F36]" />
                        <span>Completed Project Portfolio</span>
                      </div>

                      <h4 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1B3022] leading-tight">
                        {project.title}
                      </h4>

                      {project.description && (
                        <p className="text-xs sm:text-sm text-[#1B3022]/75 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D4F36] bg-[#E3F2E6] px-3.5 py-1.5 rounded-xl">
                          <Sparkles className="w-3.5 h-3.5 text-[#2D4F36]" />
                          <span>Architectural Design & Turnkey Maintenance</span>
                        </div>
                      </div>
                    </div>

                    {/* Action & Inquiry Buttons */}
                    <div className="pt-6 border-t border-[#1B3022]/10 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppEnquiry(project)}
                        className="flex-1 px-5 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>Enquire Similar Project</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        className="px-5 py-3 bg-white hover:bg-[#F1EFE7] text-[#1B3022] border border-[#1B3022]/20 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
                      >
                        <span>View Photo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots & Navigation Indicators */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-8 h-2.5 bg-[#2D4F36]'
                : 'w-2.5 h-2.5 bg-[#1B3022]/20 hover:bg-[#1B3022]/40'
            }`}
          />
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1B3022] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black relative">
              <img
                src={lightboxProject.imageUrl}
                alt={lightboxProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#112016] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A7F3D0]">
                  {lightboxProject.category}
                </span>
                <h4 className="text-xl font-serif font-bold text-[#F9F8F3]">
                  {lightboxProject.title}
                </h4>
                {lightboxProject.location && (
                  <p className="text-xs text-white/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#A7F3D0]" />
                    <span>{lightboxProject.location}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleWhatsAppEnquiry(lightboxProject);
                  setLightboxProject(null);
                }}
                className="px-6 py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Quotation for this Design</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
