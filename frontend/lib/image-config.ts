/**
 * Centralized Image Configuration for Sports Holics
 * 
 * This file defines all image handling strategies across the application
 */

export const IMAGE_CONFIG = {
  // Recommended dimensions for editors to upload
  RECOMMENDED_UPLOAD: {
    width: 1600,
    height: 1000,
    aspectRatio: '16:10',
    format: ['JPG', 'PNG', 'WEBP'],
    maxFileSize: '2MB',
  },

  // Minimum acceptable dimensions
  MINIMUM_UPLOAD: {
    width: 1200,
    height: 800,
  },

  // Maximum dimensions (for performance)
  MAXIMUM_UPLOAD: {
    width: 3200,
    height: 2000,
    maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
  },

  // Aspect ratios used across the site
  ASPECT_RATIOS: {
    // Article cards
    CARD_XS: '4:3',      // 1.33:1 - Small cards, more square
    CARD_SMALL: '16:10', // 1.6:1 - Balanced
    CARD_MEDIUM: '3:2',  // 1.5:1 - Standard photo
    CARD_LARGE: '16:9',  // 1.78:1 - Widescreen
    
    // Special layouts
    HERO: '21:9',        // Ultra-wide for hero sections
    ARTICLE_DETAIL: '16:9', // Article detail pages
    THUMBNAIL: '1:1',    // Square thumbnails (sidebar)
    LANDSCAPE: '4:3',    // Landscape oriented
  },

  // Component-specific configurations
  COMPONENTS: {
    // Article cards (homepage, sport pages)
    ARTICLE_CARD: {
      aspectRatio: 'auto', // Dynamic based on size prop
      objectFit: 'cover' as const,
      priority: false,
      sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    },

    // Article detail page
    ARTICLE_HERO: {
      aspectRatio: '16:9',
      objectFit: 'cover' as const, // Changed from contain to cover for better presentation
      priority: true,
      sizes: '(max-width: 1024px) 100vw, 1024px',
      maxHeight: '600px',
    },

    // Sidebar thumbnails
    SIDEBAR_THUMB: {
      width: 80,
      height: 80,
      aspectRatio: '1:1',
      objectFit: 'cover' as const,
      priority: false,
      sizes: '80px',
    },

    // Hero section
    HERO_SECTION: {
      aspectRatio: '21:9',
      objectFit: 'cover' as const,
      objectPosition: 'center',
      priority: true,
      sizes: '100vw',
    },

    // Sport-specific cards (Football, Basketball, Formula1)
    SPORT_LIST_CARD: {
      aspectRatio: '16:10',
      objectFit: 'cover' as const,
      priority: false,
      sizes: '(max-width: 768px) 100vw, 320px',
    },
  },
} as const;

/**
 * Get aspect ratio class for Tailwind
 */
export function getAspectRatioClass(ratio: string): string {
  const ratioMap: Record<string, string> = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    '16:10': 'aspect-[16/10]',
    '16:9': 'aspect-video',
    '21:9': 'aspect-[21/9]',
  };
  
  return ratioMap[ratio] || 'aspect-video';
}

/**
 * Get object-fit class for Tailwind
 */
export function getObjectFitClass(fit: 'cover' | 'contain' | 'fill' | 'none'): string {
  const fitMap: Record<string, string> = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };
  
  return fitMap[fit] || 'object-cover';
}

/**
 * Image quality recommendations by use case
 */
export const IMAGE_QUALITY = {
  // For hero images and article details - high quality
  HIGH: 90,
  
  // For article cards - balanced
  MEDIUM: 80,
  
  // For thumbnails - lower quality acceptable
  LOW: 70,
} as const;

/**
 * Editor guidelines summary
 */
export const EDITOR_GUIDELINES = {
  title: 'Image Upload Guidelines for Sports Holics',
  
  quickStart: {
    idealDimensions: '1600 x 1000 pixels',
    aspectRatio: '16:10 or 3:2',
    format: 'JPG (preferred) or PNG',
    fileSize: 'Under 2MB',
  },

  rules: [
    {
      category: 'Dimensions',
      requirements: [
        'Minimum: 1200 x 800 pixels',
        'Recommended: 1600 x 1000 pixels',
        'Maximum: 3200 x 2000 pixels',
      ],
    },
    {
      category: 'Aspect Ratio',
      requirements: [
        'Best: 16:10 (1.6:1) or 3:2 (1.5:1)',
        'Acceptable: 16:9 (1.78:1) or 4:3 (1.33:1)',
        'Avoid: Portrait/vertical images (will be heavily cropped)',
      ],
    },
    {
      category: 'File Format & Quality',
      requirements: [
        'Format: JPG (best), PNG, or WEBP',
        'Quality: High (80-90%)',
        'File Size: Under 2MB (compress if needed)',
      ],
    },
    {
      category: 'Composition',
      requirements: [
        'Keep main subject in center 60% of image',
        'Leave 10% breathing room on all edges',
        'Avoid text or faces near edges (may be cropped)',
        'Use landscape/horizontal orientation',
      ],
    },
  ],

  examples: {
    good: [
      'Action shot with player in center',
      'Stadium wide shot with balanced composition',
      'Team photo with subjects in middle',
      '1600x1000 JPG, 1.5MB, 16:10 ratio',
    ],
    bad: [
      'Portrait/vertical image (9:16)',
      'Face at very top or bottom edge',
      'Image smaller than 1200px wide',
      'File larger than 5MB',
    ],
  },

  tools: [
    {
      name: 'TinyPNG',
      url: 'https://tinypng.com',
      purpose: 'Compress images without quality loss',
    },
    {
      name: 'Squoosh',
      url: 'https://squoosh.app',
      purpose: 'Google\'s image optimizer with preview',
    },
    {
      name: 'Photopea',
      url: 'https://www.photopea.com',
      purpose: 'Free online editor to resize/crop',
    },
  ],
} as const;

