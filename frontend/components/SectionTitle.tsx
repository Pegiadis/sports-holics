import React from 'react';
import Image from 'next/image';

interface SectionTitleProps {
  title: string;
  icon?: string | React.ReactNode;
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  icon = "⚽",
  variant = 'default',
  className,
}) => {
  const isLarge = variant === 'large';

  const isString = typeof icon === 'string';
  const isImagePath = isString && (icon.startsWith('/') || icon.startsWith('http'));

  return (
    <div className={`relative ${className ?? 'mb-8'}`}>
      <div className="flex items-center gap-3">
        {/* Icon with subtle accent */}
        <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md shadow-red-500/20 p-2.5">
          {!isString ? (
            <div className="w-6 h-6 text-white">{icon}</div>
          ) : isImagePath ? (
            <Image src={icon} alt={title} width={28} height={28} className="object-contain" />
          ) : (
            <span className="text-2xl">{icon}</span>
          )}
        </div>

        {/* Title */}
        <div>
          <h2 className={`${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-black text-gray-900 tracking-tight`}>
            {title}
          </h2>
        </div>

        {/* Accent line extending to the right */}
        <div className="flex-1 ml-2 h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionTitle;

