/**
 * Generic Sports API Utilities
 * Shared across all sport pages (football, basketball, formula1)
 */

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Base Strapi article structure (common fields across all sports)
 */
export interface BaseStrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    url: string;
    name: string;
    alternativeText: string | null;
  } | null;
}

/**
 * Base frontend article structure
 */
export interface BaseArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  timeAgo: string;
  slug: string;
}

/**
 * Sport-specific configuration
 */
export interface SportConfig {
  endpoint: string;           // e.g., 'football-articles'
  category: string;           // e.g., 'ΠΟΔΟΣΦΑΙΡΟ'
  categoryColor: string;      // e.g., 'bg-green-100 text-green-800'
  fallbackImage: string;      // e.g., '/football.png'
}

/**
 * Fetch options for filtering articles
 */
export interface FetchOptions {
  isCarousel?: boolean;
  isMainNews?: boolean;
  isHomeSportSection?: boolean;
  limit?: number;
}

/**
 * Calculate time ago from a date string
 */
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < intervals.minute) {
    return "just now";
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
}

/**
 * Get full image URL from Strapi
 */
export function getImageUrl(imageUrl: string | undefined, fallbackImage: string): string {
  if (!imageUrl) return fallbackImage;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  return `${STRAPI_URL}${imageUrl}`;
}

/**
 * Transform Strapi article to frontend format
 * Generic function that works with any sport
 */
export function transformArticle<T extends BaseStrapiArticle>(
  article: T,
  config: SportConfig
): BaseArticle {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    author: article.author,
    imageUrl: getImageUrl(article.image?.url, config.fallbackImage),
    category: config.category,
    categoryColor: config.categoryColor,
    timeAgo: getTimeAgo(article.publishedAt || article.createdAt),
    slug: article.slug,
  };
}

/**
 * Generic fetch function for sport articles
 * Works with any sport by passing the appropriate config
 */
export async function fetchSportArticles<T extends BaseStrapiArticle>(
  config: SportConfig,
  options: FetchOptions = {}
): Promise<BaseArticle[]> {
  try {
    const params = new URLSearchParams();
    
    // Add filters
    if (options.isCarousel !== undefined) {
      params.append('filters[isCarousel][$eq]', String(options.isCarousel));
    }
    if (options.isMainNews !== undefined) {
      params.append('filters[isMainNews][$eq]', String(options.isMainNews));
    }
    if (options.isHomeSportSection !== undefined) {
      params.append('filters[isHomeSportSection][$eq]', String(options.isHomeSportSection));
    }
    
    // Add pagination
    if (options.limit) {
      params.append('pagination[limit]', String(options.limit));
    }
    
    // Always populate image and sort by date (newest first)
    params.append('populate', 'image');
    params.append('sort', 'createdAt:desc');
    
    const response = await fetch(
      `${STRAPI_URL}/api/${config.endpoint}?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status} for ${config.endpoint}`);
      return [];
    }

    const data = await response.json();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((article: T) => transformArticle(article, config));
    }

    return [];
  } catch (error) {
    console.warn(`Failed to fetch ${config.endpoint}:`, error);
    return [];
  }
}

/**
 * All sport configurations for searching across all sports
 */
export const ALL_SPORT_CONFIGS: SportConfig[] = [
  {
    endpoint: 'football-articles',
    category: 'ΠΟΔΟΣΦΑΙΡΟ',
    categoryColor: 'bg-green-100 text-green-800',
    fallbackImage: '/football.png',
  },
  {
    endpoint: 'basketball-articles',
    category: 'ΜΠΑΣΚΕΤ',
    categoryColor: 'bg-orange-100 text-orange-800',
    fallbackImage: '/basket1.png',
  },
  {
    endpoint: 'formula1-articles',
    category: 'FORMULA 1',
    categoryColor: 'bg-red-100 text-red-800',
    fallbackImage: '/f1.png',
  },
];

/**
 * Fetch a single article by slug from any sport
 * Searches across all sport endpoints until found
 */
export async function fetchArticleBySlug(slug: string): Promise<BaseArticle | null> {
  // Try each sport endpoint until we find the article
  for (const config of ALL_SPORT_CONFIGS) {
    try {
      const params = new URLSearchParams();
      params.append('filters[slug][$eq]', slug);
      params.append('populate', 'image');
      
      const response = await fetch(
        `${STRAPI_URL}/api/${config.endpoint}?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 60 },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          const article = data.data[0];
          return transformArticle(article, config);
        }
      }
    } catch (error) {
      // Continue to next sport if this one fails
      console.warn(`Failed to fetch from ${config.endpoint}:`, error);
    }
  }

  // Article not found in any sport
  return null;
}

