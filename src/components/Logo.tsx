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
              ? 'h-6 sm:h-7'
              : size === 'md'
              ? 'h-8 sm:h-10'
              : size === 'lg'
              ? 'h-10 sm:h-12'
              : 'h-12 sm:h-14'
          }`}
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col ${alignmentClass} justify-center select-none bg-transparent ${className}`}>
      <span className="font-serif font-extrabold tracking-tight text-[#1B3022] text-lg sm:text-xl lg:text-2xl leading-none">
        Plant<span className="text-[#2D4F36]">O</span>
      </span>
      {showSubtitle && (
        <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2D4F36]/80 mt-0.5">
          Nursery Gardens
        </span>
      )}
    </div>
  );
};
