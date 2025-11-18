/**
 * Homepage API - Fetches content from multiple sport APIs
 */

import { NewsArticle } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Helper to construct image URL properly
// Handles both relative paths and absolute URLs from Strapi
function getImageUrl(imageUrl: string | undefined, fallback: string): string {
  if (!imageUrl) return fallback;
  
  // If it's already a full URL, return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Otherwise, prepend the Strapi URL for relative paths
  return `${STRAPI_URL}${imageUrl}`;
}

interface StrapiArticle {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  author?: {
    id: number;
    name: string;
    slug: string;
    avatar?: {
      url: string;
    } | null;
  } | null;
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

  const referenceTime = now || new Date();
  
  return {
    category,
    categoryColor,
    title: article.title || "Untitled",
    subtitle: article.subtitle,
    description: article.description || "",
    timeAgo: getTimeAgo(article.publishedAt || article.createdAt, referenceTime),
    author: article.author?.name || "Sports Holics",
    imageUrl: getImageUrl(article.image?.url, '/no_back.png'),
    slug: article.slug,
    date: article.publishedAt || article.createdAt, // Add date for sorting
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
    
    params.append('populate[0]', 'image');
    params.append('populate[1]', 'author');
    params.append('populate[2]', 'author.avatar');
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
 * Fetch carousel articles from homepage configuration
 * Falls back to old method if configuration is not set
 */
export async function fetchCarouselNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  
  try {
    // Try to fetch from homepage configuration
    const params = new URLSearchParams();
    params.append('populate[carouselFootball][populate]', 'image');
    params.append('populate[carouselBasketball][populate]', 'image');
    params.append('populate[carouselFormula1][populate]', 'image');
    params.append('populate[carouselNews][populate]', 'image');
    
    const response = await fetch(
      `${STRAPI_URL}/api/homepage-configuration?${params.toString()}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (response.ok) {
      const data = await response.json();
      
      if (data.data) {
        const articles: NewsArticle[] = [];
        
        // Add football articles
        if (data.data.carouselFootball && Array.isArray(data.data.carouselFootball)) {
          data.data.carouselFootball.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', now));
          });
        }
        
        // Add basketball articles
        if (data.data.carouselBasketball && Array.isArray(data.data.carouselBasketball)) {
          data.data.carouselBasketball.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', now));
          });
        }
        
        // Add formula1 articles
        if (data.data.carouselFormula1 && Array.isArray(data.data.carouselFormula1)) {
          data.data.carouselFormula1.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'FORMULA 1', 'bg-red-100 text-red-800', now));
          });
        }
        
        // Add news articles
        if (data.data.carouselNews && Array.isArray(data.data.carouselNews)) {
          data.data.carouselNews.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'NEWS', 'bg-purple-100 text-purple-800', now));
          });
        }
        
        if (articles.length > 0) {
          return articles.slice(0, 10);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch carousel from homepage configuration, using fallback:', error);
  }

  // Fallback: fetch latest articles (since old flags don't exist anymore)
  const [football, basketball, formula1] = await Promise.all([
    fetchArticlesFromEndpoint('football-articles', 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', { limit: 2 }, now),
    fetchArticlesFromEndpoint('basketball-articles', 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', { limit: 2 }, now),
    fetchArticlesFromEndpoint('formula1-articles', 'FORMULA 1', 'bg-red-100 text-red-800', { limit: 2 }, now),
  ]);

  return [...football, ...basketball, ...formula1].slice(0, 6);
}

/**
 * Fetch latest news from all sports (truly latest by date - no filter)
 * Returns 10 items sorted by publication date (newest first)
 */
export async function fetchLatestNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  const [football, basketball, formula1] = await Promise.all([
    fetchArticlesFromEndpoint('football-articles', 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', { limit: 10 }, now),
    fetchArticlesFromEndpoint('basketball-articles', 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', { limit: 10 }, now),
    fetchArticlesFromEndpoint('formula1-articles', 'FORMULA 1', 'bg-red-100 text-red-800', { limit: 10 }, now),
  ]);

  // Combine all articles
  const allArticles = [...football, ...basketball, ...formula1];
  
  // Sort by date (newest first) - using publishedAt or createdAt
  const sortedArticles = allArticles.sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
  });
  
  return sortedArticles.slice(0, 10);
}

/**
 * Fetch main news from homepage configuration
 * Falls back to old method if configuration is not set
 */
export async function fetchMainNews(referenceTime?: Date): Promise<NewsArticle[]> {
  const now = referenceTime || new Date();
  
  try {
    // Try to fetch from homepage configuration
    const params = new URLSearchParams();
    params.append('populate[mainNewsFootball][populate]', 'image');
    params.append('populate[mainNewsBasketball][populate]', 'image');
    params.append('populate[mainNewsFormula1][populate]', 'image');
    params.append('populate[mainNewsNews][populate]', 'image');
    
    const response = await fetch(
      `${STRAPI_URL}/api/homepage-configuration?${params.toString()}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (response.ok) {
      const data = await response.json();
      
      if (data.data) {
        const articles: NewsArticle[] = [];
        
        // Add football articles
        if (data.data.mainNewsFootball && Array.isArray(data.data.mainNewsFootball)) {
          data.data.mainNewsFootball.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'ΠΟΔΟΣΦΑΙΡΟ', 'bg-green-100 text-green-800', now));
          });
        }
        
        // Add basketball articles
        if (data.data.mainNewsBasketball && Array.isArray(data.data.mainNewsBasketball)) {
          data.data.mainNewsBasketball.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'ΜΠΑΣΚΕΤ', 'bg-orange-100 text-orange-800', now));
          });
        }
        
        // Add formula1 articles
        if (data.data.mainNewsFormula1 && Array.isArray(data.data.mainNewsFormula1)) {
          data.data.mainNewsFormula1.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'FORMULA 1', 'bg-red-100 text-red-800', now));
          });
        }
        
        // Add news articles
        if (data.data.mainNewsNews && Array.isArray(data.data.mainNewsNews)) {
          data.data.mainNewsNews.forEach((article: StrapiArticle) => {
            articles.push(transformToNewsArticle(article, 'NEWS', 'bg-purple-100 text-purple-800', now));
          });
        }
        
        return articles.slice(0, 10);
      }
    }
  } catch (error) {
    console.warn('Failed to fetch main news from homepage configuration:', error);
  }

  // Return empty array - main news should only come from homepage-configuration
  return [];
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
    { limit: 9 },
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
    { limit: 9 },
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
    { limit: 9 },
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
    { limit: 9 },
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
  coverImageUrl: string;
  category?: string;
  readTime?: number;
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

    return data.data.map((item: { id: number; text: string; link?: string }) => ({
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

    return data.data.map((item: { id: number; name: string; slug: string; title?: string; bio?: string; avatar?: { url?: string }; articleCount?: number; specialty?: string; twitter?: string; instagram?: string }) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      title: item.title || '',
      bio: item.bio || '',
      avatarUrl: getImageUrl(item.avatar?.url, '/default-avatar.jpg'),
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
    params.append('populate[0]', 'backgroundImage');
    params.append('populate[1]', 'linkedFootballArticle');
    params.append('populate[2]', 'linkedBasketballArticle');
    params.append('populate[3]', 'linkedFormula1Article');
    params.append('populate[4]', 'linkedNewsArticle');
    params.append('pagination[limit]', '1');

    const response = await fetch(
      `${STRAPI_URL}/api/hero-sections?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
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
    
    // Extract URL from background image (can be object or string)
    let backgroundImageUrl: string | undefined;
    if (typeof hero.backgroundImage === 'string') {
      backgroundImageUrl = hero.backgroundImage;
    } else if (hero.backgroundImage && typeof hero.backgroundImage === 'object') {
      backgroundImageUrl = hero.backgroundImage.url;
    }
    
    const finalImageUrl = getImageUrl(backgroundImageUrl, '/216-scaled-1.jpg');

    // Generate buttonLink from linked article
    let buttonLink = '#';
    if (hero.linkedFootballArticle?.slug) {
      buttonLink = `/article/${hero.linkedFootballArticle.slug}`;
    } else if (hero.linkedBasketballArticle?.slug) {
      buttonLink = `/article/${hero.linkedBasketballArticle.slug}`;
    } else if (hero.linkedFormula1Article?.slug) {
      buttonLink = `/article/${hero.linkedFormula1Article.slug}`;
    } else if (hero.linkedNewsArticle?.slug) {
      buttonLink = `/article/${hero.linkedNewsArticle.slug}`;
    }

    return {
      id: hero.id,
      title: hero.title || 'Τελικός Champions League',
      titleHighlight: hero.titleHighlight || 'Έτοιμος για Επική Αναμέτρηση',
      description: hero.description || 'Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη.',
      categoryLabel: hero.categoryLabel || 'Ποδόσφαιρο',
      categoryEmoji: hero.categoryEmoji || '🔥',
      timeAgo: hero.timeAgo || '5 λεπτά πριν',
      buttonText: hero.buttonText || 'Διαβάστε περισσότερα →',
      buttonLink: buttonLink,
      backgroundImageUrl: finalImageUrl,
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

