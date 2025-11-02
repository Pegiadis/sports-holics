import React from 'react';

interface SectionDividerProps {
  variant?: 'default' | 'gradient' | 'sporty';
}

const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'sporty' }) => {
  if (variant === 'gradient') {
    return (
      <div className="my-12 flex items-center justify-center">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      </div>
    );
  }

  if (variant === 'sporty') {
    return (
      <div className="my-12 flex items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-grow h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-red-500"></div>
          <div className="mx-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-grow h-0.5 bg-gradient-to-l from-transparent via-gray-300 to-red-500"></div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="my-12 relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-gray-50 px-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default SectionDivider;

