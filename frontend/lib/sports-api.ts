/**
 * Generic Sports API Utilities
 * Shared across all sport pages (football, basketball, formula1)
 */

// Remove trailing slash from STRAPI_URL to prevent double slashes in API calls
const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
export const STRAPI_URL = rawStrapiUrl.endsWith('/') ? rawStrapiUrl.slice(0, -1) : rawStrapiUrl;

/**
 * SEO metadata structure
 */
export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    url: string;
  } | null;
  keywords?: string;
  metaRobots?: string;
  canonicalURL?: string;
}

/**
 * Base Strapi article structure (common fields across all sports)
 */
export interface BaseStrapiArticle {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  content: unknown;  // Dynamic Zone with text blocks and video embeds
  author: {
    id: number;
    name: string;
    slug: string;
    avatar?: {
      url: string;
    } | null;
  } | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    url: string;
    name: string;
    alternativeText: string | null;
  } | null;
  seo?: SeoData | null;
}

/**
 * Base frontend article structure
 */
export interface BaseArticle {
  id: number;
  title: string;
  subtitle?: string;
  content: unknown;  // Dynamic Zone with text blocks and video embeds
  author: string;
  authorName?: string;
  authorSlug?: string;
  authorAvatarUrl?: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  timeAgo: string;
  publishedAt: string;  // ISO date string for exact publication time
  slug: string;
  seo?: SeoData | null;
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
  page?: number;
}

/**
 * Pagination metadata from Strapi
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Response with pagination data
 */
export interface PaginatedResponse<T> {
  articles: T[];
  pagination: PaginationMeta;
}

/**
 * Calculate time ago from a date string
 * @param dateString - The date to calculate from
 * @param referenceTime - Optional reference time (defaults to now)
 */
export function getTimeAgo(dateString: string, referenceTime?: Date): string {
  const date = new Date(dateString);
  const now = referenceTime || new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Greek time intervals with singular and plural forms
  const intervals: { singular: string; plural: string; seconds: number }[] = [
    { singular: 'χρόνο', plural: 'χρόνια', seconds: 31536000 },
    { singular: 'μήνα', plural: 'μήνες', seconds: 2592000 },
    { singular: 'εβδομάδα', plural: 'εβδομάδες', seconds: 604800 },
    { singular: 'μέρα', plural: 'μέρες', seconds: 86400 },
    { singular: 'ώρα', plural: 'ώρες', seconds: 3600 },
    { singular: 'λεπτό', plural: 'λεπτά', seconds: 60 },
  ];

  if (seconds < 60) return "μόλις τώρα";

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      const unit = count === 1 ? interval.singular : interval.plural;
      return `πριν ${count} ${unit}`;
    }
  }

  return "μόλις τώρα";
}

/**
 * Format date to Greek locale with exact time
 * @param dateString - ISO date string
 * @returns Formatted date string like "12 Δεκεμβρίου 2025, 14:30"
 */
export function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Greek month names
  const months = [
    'Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου',
    'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου',
    'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
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
    subtitle: article.subtitle,
    content: article.content,
    author: article.author?.name || 'Sports Holics',
    authorName: article.author?.name,
    authorSlug: article.author?.slug,
    authorAvatarUrl: article.author?.avatar?.url ? getImageUrl(article.author.avatar.url, '/default-avatar.jpg') : undefined,
    imageUrl: getImageUrl(article.image?.url, config.fallbackImage),
    category: config.category,
    categoryColor: config.categoryColor,
    timeAgo: getTimeAgo(article.createdAt),
    publishedAt: article.createdAt,  // Use createdAt as it never changes when editing
    slug: article.slug,
    seo: article.seo,
  };
}

/**
 * Generic fetch function for sport articles (simple version without pagination metadata)
 * Works with any sport by passing the appropriate config
 */
export async function fetchSportArticles<T extends BaseStrapiArticle>(
  config: SportConfig,
  options: FetchOptions = {}
): Promise<BaseArticle[]> {
  const result = await fetchSportArticlesWithPagination<T>(config, options);
  return result.articles;
}

/**
 * Generic fetch function for sport articles with pagination metadata
 * Works with any sport by passing the appropriate config
 */
export async function fetchSportArticlesWithPagination<T extends BaseStrapiArticle>(
  config: SportConfig,
  options: FetchOptions = {}
): Promise<PaginatedResponse<BaseArticle>> {
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
    const page = options.page || 1;
    const pageSize = options.limit || 10;
    params.append('pagination[page]', String(page));
    params.append('pagination[pageSize]', String(pageSize));
    
    // Always populate image, SEO, author (journalist), dynamic zone content, and sort by date (newest first)
    params.append('populate[image]', 'true');
    params.append('populate[seo][populate][0]', 'metaImage');
    params.append('populate[seo][populate][1]', 'metaSocial');
    params.append('populate[seo][populate][2]', 'metaSocial.image');
    params.append('populate[author][populate]', 'avatar');
    // Populate dynamic zone - use deep populate to get all nested fields including media
    params.append('populate[content][populate]', '*');
    params.append('sort', 'createdAt:desc');
    
    const response = await fetch(
      `${STRAPI_URL}/api/${config.endpoint}?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status} for ${config.endpoint}`);
      return {
        articles: [],
        pagination: { page: 1, pageSize: pageSize, pageCount: 0, total: 0 }
      };
    }

    const data = await response.json();
    
    const articles = data.data && Array.isArray(data.data)
      ? data.data.map((article: T) => transformArticle(article, config))
      : [];

    const pagination: PaginationMeta = data.meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: Math.ceil(articles.length / pageSize),
      total: articles.length
    };

    return { articles, pagination };
  } catch (error) {
    console.warn(`Failed to fetch ${config.endpoint}:`, error);
    const pageSize = options.limit || 10;
    return {
      articles: [],
      pagination: { page: 1, pageSize: pageSize, pageCount: 0, total: 0 }
    };
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
  {
    endpoint: 'news-articles',
    category: 'ΕΙΔΗΣΕΙΣ',
    categoryColor: 'bg-blue-100 text-blue-800',
    fallbackImage: '/default-news.jpg',
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
      // Use consistent populate syntax - named fields
      params.append('populate[image]', 'true');
      params.append('populate[seo][populate][0]', 'metaImage');
      params.append('populate[seo][populate][1]', 'metaSocial');
      params.append('populate[seo][populate][2]', 'metaSocial.image');
      params.append('populate[author][populate]', 'avatar');
      // Populate dynamic zone - use deep populate to get all nested fields including media
      params.append('populate[content][populate]', '*');
      
      const response = await fetch(
        `${STRAPI_URL}/api/${config.endpoint}?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Real-time updates from CMS
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

/**
 * Create sport-specific API functions from a config
 * Factory function to reduce boilerplate in sport API files
 */
export function createSportApi(config: SportConfig) {
  return {
    fetchArticles: (options: FetchOptions = {}): Promise<BaseArticle[]> =>
      fetchSportArticles(config, options),
    fetchArticlesWithPagination: (options: FetchOptions = {}): Promise<PaginatedResponse<BaseArticle>> =>
      fetchSportArticlesWithPagination(config, options),
    config,
  };
}

// Pre-configured sport APIs
export const FOOTBALL_CONFIG: SportConfig = {
  endpoint: 'football-articles',
  category: 'ΠΟΔΟΣΦΑΙΡΟ',
  categoryColor: 'bg-green-100 text-green-800',
  fallbackImage: '/football.png',
};

export const BASKETBALL_CONFIG: SportConfig = {
  endpoint: 'basketball-articles',
  category: 'ΜΠΑΣΚΕΤ',
  categoryColor: 'bg-orange-100 text-orange-800',
  fallbackImage: '/basketball.png',
};

export const FORMULA1_CONFIG: SportConfig = {
  endpoint: 'formula1-articles',
  category: 'FORMULA 1',
  categoryColor: 'bg-red-100 text-red-800',
  fallbackImage: '/formula1.png',
};

// Create sport APIs
export const footballApi = createSportApi(FOOTBALL_CONFIG);
export const basketballApi = createSportApi(BASKETBALL_CONFIG);
export const formula1Api = createSportApi(FORMULA1_CONFIG);

