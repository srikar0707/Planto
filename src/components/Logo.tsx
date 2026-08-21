import React from 'react';

interface LogoProps {
  customLogoUrl?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  align?: 'left' | 'center';
}

export const Logo: React.FC<LogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
  showSubtitle = true,
  align = 'left',
}) => {
  const alignmentClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  if (customLogoUrl && customLogoUrl.trim().length > 0) {
    return (
      <div className={`inline-flex flex-col ${alignmentClass} justify-center bg-transparent ${className}`}>
        <img
          src={customLogoUrl}
          alt="PlantO Nursery Gardens Logo"
          className={`object-contain mix-blend-multiply bg-transparent transition-opacity duration-200 ${
            size === 'sm'
              ? 'h-8 sm:h-9'
              : size === 'md'
              ? 'h-11 sm:h-13'
              : size === 'lg'
              ? 'h-13 sm:h-16 md:h-18'
              : 'h-16 sm:h-20 md:h-24'
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col ${alignmentClass} justify-center select-none bg-transparent ${className}`}>
      <span className="font-serif font-extrabold tracking-tight text-[#1B3022] text-xl sm:text-2xl md:text-3xl leading-none">
        Plant<span className="text-[#2D4F36]">O</span>
      </span>
      {showSubtitle && (
        <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#2D4F36]/80 mt-0.5">
          Nursery Gardens
        </span>
      )}
    </div>
  );
};
