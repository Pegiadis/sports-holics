/**
 * OptimizedImage Component
 * 
 * Centralized image component that handles all image display logic
 * consistently across the application.
 */

import Image from 'next/image';
import { IMAGE_CONFIG, getAspectRatioClass, getObjectFitClass } from '@/lib/image-config';

type ImageContext = 
  | 'article-card'
  | 'article-hero'
  | 'sidebar-thumb'
  | 'hero-section'
  | 'sport-card';

interface OptimizedImageProps {
  src: string;
  alt: string;
  context: ImageContext;
  cardSize?: 'xs' | 'small' | 'medium' | 'large';
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  context,
  cardSize = 'medium',
  priority,
  className = '',
}: OptimizedImageProps) {
  
  // Get configuration based on context
  const getConfig = () => {
    switch (context) {
      case 'article-card':
        const ratioMap = {
          xs: IMAGE_CONFIG.ASPECT_RATIOS.CARD_XS,
          small: IMAGE_CONFIG.ASPECT_RATIOS.CARD_SMALL,
          medium: IMAGE_CONFIG.ASPECT_RATIOS.CARD_MEDIUM,
          large: IMAGE_CONFIG.ASPECT_RATIOS.CARD_LARGE,
        };
        return {
          ...IMAGE_CONFIG.COMPONENTS.ARTICLE_CARD,
          aspectRatio: ratioMap[cardSize],
        };

      case 'article-hero':
        return IMAGE_CONFIG.COMPONENTS.ARTICLE_HERO;

      case 'sidebar-thumb':
        return IMAGE_CONFIG.COMPONENTS.SIDEBAR_THUMB;

      case 'hero-section':
        return IMAGE_CONFIG.COMPONENTS.HERO_SECTION;

      case 'sport-card':
        return IMAGE_CONFIG.COMPONENTS.SPORT_LIST_CARD;

      default:
        return IMAGE_CONFIG.COMPONENTS.ARTICLE_CARD;
    }
  };

  const config = getConfig();
  
  // Handle aspectRatio which might not exist in all configs
  const aspectRatioValue = 'aspectRatio' in config ? config.aspectRatio : null;
  const aspectRatioClass = aspectRatioValue && typeof aspectRatioValue === 'string' 
    ? getAspectRatioClass(aspectRatioValue) 
    : '';
  const objectFitClass = getObjectFitClass(config.objectFit);

  // Special handling for fixed-size thumbnails
  if (context === 'sidebar-thumb') {
    return (
      <div className={`relative w-20 h-20 rounded overflow-hidden flex-shrink-0 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={config.sizes}
          className={objectFitClass}
          priority={priority ?? config.priority}
        />
      </div>
    );
  }

  // For aspect-ratio based images
  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden bg-gray-100 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={config.sizes}
        className={`${objectFitClass} ${context === 'article-card' ? 'transition-transform duration-300 hover:scale-105' : ''}`}
        priority={priority ?? config.priority}
      />
    </div>
  );
}

/**
 * Utility function to check if image meets minimum requirements
 */
export function validateImageDimensions(width: number, height: number): {
  valid: boolean;
  message?: string;
} {
  const { MINIMUM_UPLOAD } = IMAGE_CONFIG;

  if (width < MINIMUM_UPLOAD.width || height < MINIMUM_UPLOAD.height) {
    return {
      valid: false,
      message: `Image too small. Minimum dimensions: ${MINIMUM_UPLOAD.width}x${MINIMUM_UPLOAD.height}px. Uploaded: ${width}x${height}px`,
    };
  }

  // Check aspect ratio
  const ratio = width / height;
  const isLandscape = ratio >= 1.2; // At least 6:5 ratio

  if (!isLandscape) {
    return {
      valid: false,
      message: `Please use landscape-oriented images. Uploaded ratio: ${ratio.toFixed(2)}:1`,
    };
  }

  return { valid: true };
}

/**
 * Utility to get recommended dimensions message
 */
export function getImageRecommendation(): string {
  const { RECOMMENDED_UPLOAD } = IMAGE_CONFIG;
  return `Recommended: ${RECOMMENDED_UPLOAD.width}x${RECOMMENDED_UPLOAD.height}px (${RECOMMENDED_UPLOAD.aspectRatio}), ${RECOMMENDED_UPLOAD.format.join('/')}, under ${RECOMMENDED_UPLOAD.maxFileSize}`;
}

