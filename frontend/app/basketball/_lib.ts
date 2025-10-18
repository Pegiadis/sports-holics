import { BasketballArticle, StrapiBasketballArticle } from "./types";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

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
  export function getImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) return '/basket1.png'; // Default fallback
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    return `${STRAPI_URL}${imageUrl}`;
  }
  
  /**
   * Transform Strapi article to frontend format
   */
  export function transformArticle(article: StrapiBasketballArticle): BasketballArticle {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
      imageUrl: getImageUrl(article.image?.url),
      category: "ΜΠΑΣΚΕΤ",
      categoryColor: "bg-orange-100 text-orange-800",
      timeAgo: getTimeAgo(article.publishedAt || article.createdAt),
      slug: article.slug,
    };
  }

