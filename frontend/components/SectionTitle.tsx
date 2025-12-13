import React from 'react';
import Image from 'next/image';

interface SectionTitleProps {
  title: string;
  icon?: string;
  variant?: 'default' | 'large' | 'small';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  icon = "⚽", 
  variant = 'default'
}) => {
  const isLarge = variant === 'large';
  
  // Check if icon is a file path (SVG, PNG, etc.) or an emoji
  const isImagePath = icon.startsWith('/') || icon.startsWith('http');
  
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-3">
        {/* Icon with background */}
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg p-2">
          {isImagePath ? (
            <Image 
              src={icon} 
              alt={title}
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <span className="text-2xl">{icon}</span>
          )}
        </div>
        
        {/* Title */}
        <div className="flex-1">
          <h2 className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 flex items-center gap-2`}>
            {title}
          </h2>
          {/* Red underline accent */}
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-1"></div>
        </div>
        
      </div>
    </div>
  );
};

export default SectionTitle;

