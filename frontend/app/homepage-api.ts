/**
 * Homepage API - Fetches content from multiple sport APIs
 */

import { NewsArticle } from "@/types";
import { getImageUrl, getTimeAgo } from "@/lib/sports-api";
import { richtextToPlainText } from "@/lib/richtext-utils";

// Re-export from focused API modules for backwards compatibility
export type { BreakingNewsItem } from "@/lib/breaking-news-api";
export { fetchBreakingNews } from "@/lib/breaking-news-api";
export type { JournalistData } from "@/lib/journalist-api";
export { fetchJournalists } from "@/lib/journalist-api";
export type { HeroSectionData } from "@/lib/hero-api";
export { fetchHeroSection } from "@/lib/hero-api";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface StrapiArticle {
  id: number;
  title?: string;
  subtitle?: string;
  content?: unknown;  // Dynamic Zone with text blocks and video embeds
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
  const referenceTime = now || new Date();

  return {
    category,
    categoryColor,
    title: article.title || "Untitled",
    subtitle: article.subtitle,
    description: article.content ? richtextToPlainText(article.content) : "",
    timeAgo: getTimeAgo(article.publishedAt || article.createdAt, referenceTime),
    author: article.author?.name || "Sports Holics",
    imageUrl: getImageUrl(article.image?.url, '/no_back.png'),
    slug: article.slug,
    date: article.publishedAt || article.createdAt,
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
    params.append('populate[carouselFootball][populate][0]', 'image');
    params.append('populate[carouselFootball][populate][1]', 'author');
    params.append('populate[carouselFootball][populate][2]', 'author.avatar');
    params.append('populate[carouselBasketball][populate][0]', 'image');
    params.append('populate[carouselBasketball][populate][1]', 'author');
    params.append('populate[carouselBasketball][populate][2]', 'author.avatar');
    params.append('populate[carouselFormula1][populate][0]', 'image');
    params.append('populate[carouselFormula1][populate][1]', 'author');
    params.append('populate[carouselFormula1][populate][2]', 'author.avatar');
    params.append('populate[carouselNews][populate][0]', 'image');
    params.append('populate[carouselNews][populate][1]', 'author');
    params.append('populate[carouselNews][populate][2]', 'author.avatar');
    
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
            articles.push(transformToNewsArticle(article, 'AUTO MOTO', 'bg-blue-100 text-blue-800', now));
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
    console.warn('Failed to fetch carousel from homepage configuration:', error);
  }

  // Return empty array if no carousel configuration is set
  return [];
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
    fetchArticlesFromEndpoint('formula1-articles', 'AUTO MOTO', 'bg-blue-100 text-blue-800', { limit: 10 }, now),
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
    params.append('populate[mainNewsFootball][populate][0]', 'image');
    params.append('populate[mainNewsFootball][populate][1]', 'author');
    params.append('populate[mainNewsFootball][populate][2]', 'author.avatar');
    params.append('populate[mainNewsBasketball][populate][0]', 'image');
    params.append('populate[mainNewsBasketball][populate][1]', 'author');
    params.append('populate[mainNewsBasketball][populate][2]', 'author.avatar');
    params.append('populate[mainNewsFormula1][populate][0]', 'image');
    params.append('populate[mainNewsFormula1][populate][1]', 'author');
    params.append('populate[mainNewsFormula1][populate][2]', 'author.avatar');
    params.append('populate[mainNewsNews][populate][0]', 'image');
    params.append('populate[mainNewsNews][populate][1]', 'author');
    params.append('populate[mainNewsNews][populate][2]', 'author.avatar');
    
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
            articles.push(transformToNewsArticle(article, 'AUTO MOTO', 'bg-blue-100 text-blue-800', now));
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
    'AUTO MOTO',
    'bg-blue-100 text-blue-800',
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
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: {
      url: string;
    } | null;
    keywords?: string;
    metaRobots?: string;
    canonicalURL?: string;
  } | null;
}

