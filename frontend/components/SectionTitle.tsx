import React from 'react';
import Image from 'next/image';

interface SectionTitleProps {
  title: string;
  icon?: string | React.ReactNode;
  variant?: 'default' | 'large' | 'small';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  icon = "⚽", 
  variant = 'default'
}) => {
  const isLarge = variant === 'large';
  
  // Check if icon is a string (path or emoji) or a React node (SVG component)
  const isString = typeof icon === 'string';
  const isImagePath = isString && (icon.startsWith('/') || icon.startsWith('http'));
  
  return (
    <div className="relative mb-8">
      <div className="flex items-center gap-4">
        {/* Modern Icon Container with Glow Effect */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300 p-3">
            {!isString ? (
              // Render React node (SVG component)
              <div className="w-8 h-8 text-white">
                {icon}
              </div>
            ) : isImagePath ? (
              <Image 
                src={icon} 
                alt={title}
                width={36}
                height={36}
                className="object-contain"
              />
            ) : (
              <span className="text-3xl filter drop-shadow-lg">{icon}</span>
            )}
          </div>
        </div>
        
        {/* Title with Modern Typography */}
        <div className="flex-1">
          <h2 className={`${isLarge ? 'text-4xl' : 'text-3xl'} font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent`}>
            {title}
          </h2>
          {/* Animated Accent Bar */}
          <div className="relative mt-2 h-1 w-24 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;

