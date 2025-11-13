/**
 * Homepage API - Fetches content from multiple sport APIs
 * Version: 2024-11-13 - Fixed absolute URL handling
 */

import { NewsArticle } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface StrapiArticle {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  author?: string;
  slug?: string;
  createdAt: string;
  publishedAt?: string;
  image?: {
    url?: string;
  } | null;
}

// Helper to transform articles to NewsArticle format
function transformToNewsArticle(article: StrapiArticle, category: string, categoryColor: string, now?: Date): NewsArticle {
  const getTimeAgo = (dateString: string, referenceTime: Date): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((referenceTime.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    if (seconds < intervals.minute) return "just now";

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return "just now";
  };

  const getImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl) return '/no_back.png';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    return `${STRAPI_URL}${imageUrl}`;
  };

  const referenceTime = now || new Date();
  
  return {
    category,
    categoryColor,
    title: article.title || "Untitled",
    subtitle: article.subtitle,
    description: article.description || "",
    timeAgo: getTimeAgo(article.publishedAt || article.createdAt, referenceTime),
    author: article.author || "Unknown",
    imageUrl: getImageUrl(article.image?.url),
    slug: article.slug,
  };
}

// Fetch articles from a specific endpoint with filters
async function fetchArticlesFromEndpoint(
  endpoint: string,
  category: string,
  categoryColor: string,
  options: { isCarousel?: boolean; isMainNews?: boolean; isHomeSportSection?: boolean; limit?: number } = {},
  referenceTime?: Date
): Promise<NewsArticle[]> {
  try {
    const params = new URLSearchParams();
    
    if (options.isCarousel !== undefined) {
      params.append('filters[isCarousel][$eq]', String(options.isCarousel));
    }
    if (options.isMainNews !== undefined) {
      params.append('filters[isMainNews][$eq]', String(options.isMainNews));
    }
    if (options.isHomeSportSection !== undefined) {
      params.append('filters[isHomeSportSection][$eq]', String(options.isHomeSportSection));
    }
    if (options.limit) {
      params.append('pagination[limit]', String(options.limit));
    }
    
    params.append('populate', 'image');
    params.append('sort', 'createdAt:desc');

    const response = await fetch(
      `${STRAPI_URL}/api/${endpoint}?${params.toString()}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    
    // Use the same reference time for all articles to ensure consistency
    const now = referenceTime || new Date();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((article: StrapiArticle) => 
        transformToNewsArticle(article, category, categoryColor, now)
      );
    }

    return [];
  } catch (error) {
    console.warn(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
}

/**
 * Fetch carousel articles from all sports (Hot News)
 */
export async function fetchCarouselNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  const [football, basketball, formula1] = await Promise.all([
    fetchArticlesFromEndpoint('football-articles', 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', { isCarousel: true, limit: 2 }, now),
    fetchArticlesFromEndpoint('basketball-articles', 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', { isCarousel: true, limit: 2 }, now),
    fetchArticlesFromEndpoint('formula1-articles', 'FORMULA 1', 'bg-red-100 text-red-800', { isCarousel: true, limit: 2 }, now),
  ]);

  return [...football, ...basketball, ...formula1].slice(0, 6);
}

/**
 * Fetch latest news from all sports (truly latest by date - no filter)
 * Returns 10 items for carousel
 */
export async function fetchLatestNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  const [football, basketball, formula1] = await Promise.all([
    fetchArticlesFromEndpoint('football-articles', 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', { limit: 4 }, now),
    fetchArticlesFromEndpoint('basketball-articles', 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', { limit: 3 }, now),
    fetchArticlesFromEndpoint('formula1-articles', 'FORMULA 1', 'bg-red-100 text-red-800', { limit: 3 }, now),
  ]);

  // Combine all, sort by date (newest first), take 10
  const allArticles = [...football, ...basketball, ...formula1];
  return allArticles.slice(0, 10);
}

/**
 * Fetch main news from all sports (flagged as main news)
 * Returns up to 8 most recent articles with isMainNews flag
 */
export async function fetchMainNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  const [football, basketball, formula1] = await Promise.all([
    fetchArticlesFromEndpoint('football-articles', 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', { isMainNews: true, limit: 4 }, now),
    fetchArticlesFromEndpoint('basketball-articles', 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', { isMainNews: true, limit: 3 }, now),
    fetchArticlesFromEndpoint('formula1-articles', 'FORMULA 1', 'bg-red-100 text-red-800', { isMainNews: true, limit: 3 }, now),
  ]);

  return [...football, ...basketball, ...formula1].slice(0, 8);
}

/**
 * Fetch homepage football section articles
 */
export async function fetchHomepageFootball(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  return fetchArticlesFromEndpoint(
    'football-articles',
    'ΠΟΔΟΣΦΑΙΡΟ',
    'bg-green-100 text-green-800',
    { isHomeSportSection: true, limit: 9 },
    now
  );
}

/**
 * Fetch homepage basketball section articles
 */
export async function fetchHomepageBasketball(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  return fetchArticlesFromEndpoint(
    'basketball-articles',
    'ΜΠΑΣΚΕΤ',
    'bg-orange-100 text-orange-800',
    { isHomeSportSection: true, limit: 9 },
    now
  );
}

/**
 * Fetch homepage formula1 section articles
 */
export async function fetchHomepageFormula1(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  return fetchArticlesFromEndpoint(
    'formula1-articles',
    'FORMULA 1',
    'bg-red-100 text-red-800',
    { isHomeSportSection: true, limit: 9 },
    now
  );
}

/**
 * Fetch news articles for the homepage News section
 */
export async function fetchHomepageNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  return fetchArticlesFromEndpoint(
    'news-articles',
    'NEWS',
    'bg-purple-100 text-purple-800',
    { isHomeSportSection: true, limit: 9 },
    now
  );
}

/**
 * Hero Section Data Interface
 */
export interface HeroSectionData {
  id: number;
  title: string;
  titleHighlight?: string;
  description: string;
  categoryLabel: string;
  categoryEmoji?: string;
  timeAgo?: string;
  buttonText: string;
  buttonLink?: string;
  backgroundImageUrl: string;
}

/**
 * Journalist Data Interface
 */
export interface JournalistData {
  id: number;
  name: string;
  slug: string;
  title?: string;
  bio?: string;
  avatarUrl: string;
  specialty?: string;
  twitter?: string;
  instagram?: string;
}

/**
 * Blog Article Data Interface
 */
export interface BlogArticleData {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImageUrl: string;
  category?: string;
  tags?: string[];
  readTime?: number;
  isFeatured: boolean;
  publishedAt: string;
  timeAgo: string;
  journalist: {
    id: number;
    name: string;
    slug: string;
    avatarUrl: string;
  };
}

/**
 * Breaking News Data Interface
 */
export interface BreakingNewsItem {
  id: number;
  text: string;
  link?: string;
}

/**
 * Fetch active breaking news items
 */
export async function fetchBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'createdAt:desc');
    params.append('pagination[limit]', '10');

    const response = await fetch(
      `${STRAPI_URL}/api/breaking-news-items?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch breaking news:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((item: any) => ({
      id: item.id,
      text: item.text,
      link: item.link || undefined,
    }));
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
}

/**
 * Fetch active journalists
 */
export async function fetchJournalists(): Promise<JournalistData[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'name:asc');
    params.append('populate', 'avatar');

    const response = await fetch(
      `${STRAPI_URL}/api/journalists?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch journalists:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      title: item.title || '',
      bio: item.bio || '',
      avatarUrl: item.avatar?.url ? `${STRAPI_URL}${item.avatar.url}` : '/default-avatar.jpg',
      specialty: item.specialty || '',
      twitter: item.twitter || '',
      instagram: item.instagram || '',
    }));
  } catch (error) {
    console.error('Error fetching journalists:', error);
    return [];
  }
}

/**
 * Fetch active hero section content
 */
export async function fetchHeroSection(): Promise<HeroSectionData | null> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('populate', 'backgroundImage');
    params.append('pagination[limit]', '1');

    // Add cache buster to ensure fresh data
    params.append('_t', Date.now().toString());
    
    const response = await fetch(
      `${STRAPI_URL}/api/hero-sections?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        cache: 'no-store', // Real-time updates from CMS
        next: { revalidate: 0 }, // Disable Next.js caching completely
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch hero section:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const hero = data.data[0];
    
    // Helper function to construct image URL properly
    // Strapi can return either relative paths or full URLs depending on configuration
    const getImageUrl = (imageData: any): string => {
      if (!imageData) {
        return '/216-scaled-1.jpg';
      }
      
      // Get the URL from the image data
      const imageUrl = imageData.url;
      
      if (!imageUrl) {
        return '/216-scaled-1.jpg';
      }
      
      // Debug logging for production
      console.log('[fetchHeroSection] STRAPI_URL:', STRAPI_URL);
      console.log('[fetchHeroSection] imageUrl from Strapi:', imageUrl);
      console.log('[fetchHeroSection] imageUrl type:', typeof imageUrl);
      console.log('[fetchHeroSection] imageUrl starts with http:', imageUrl.startsWith('http://'));
      console.log('[fetchHeroSection] imageUrl starts with https:', imageUrl.startsWith('https://'));
      
      // If it's already a full URL, return it as is
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        console.log('[fetchHeroSection] Returning absolute URL:', imageUrl);
        return imageUrl;
      }
      
      // Otherwise, prepend the Strapi URL for relative paths
      const constructedUrl = `${STRAPI_URL}${imageUrl}`;
      console.log('[fetchHeroSection] Constructed URL:', constructedUrl);
      return constructedUrl;
    };

    const finalImageUrl = getImageUrl(hero.backgroundImage);
    console.log('[fetchHeroSection] FINAL backgroundImageUrl:', finalImageUrl);

    return {
      id: hero.id,
      title: hero.title || 'Τελικός Champions League',
      titleHighlight: hero.titleHighlight || 'Έτοιμος για Επική Αναμέτρηση',
      description: hero.description || 'Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη.',
      categoryLabel: hero.categoryLabel || 'Ποδόσφαιρο',
      categoryEmoji: hero.categoryEmoji || '🔥',
      timeAgo: hero.timeAgo || '5 λεπτά πριν',
      buttonText: hero.buttonText || 'Διαβάστε περισσότερα →',
      buttonLink: hero.buttonLink || '#',
      backgroundImageUrl: finalImageUrl,
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

