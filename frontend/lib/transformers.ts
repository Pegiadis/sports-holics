/**
 * Data transformers to convert Strapi API responses to frontend types
 */

import { NewsArticle } from "@/types";
import { StrapiArticle, getStrapiImageUrl } from "./api";
import { CATEGORY_COLORS } from "./constants";

/**
 * Calculate time ago from a date string
 */
function getTimeAgo(dateString: string): string {
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
 * Get category color based on category name
 */
function getCategoryColor(category: string): string {
  const upperCategory = category.toUpperCase();
  return CATEGORY_COLORS[upperCategory] || "bg-gray-100 text-gray-800";
}

/**
 * Transform a Strapi article to NewsArticle format
 */
export function transformStrapiArticle(strapiArticle: StrapiArticle): NewsArticle {
  // Get image URL - in Strapi v5, image is directly on the article object
  let imageUrl = "/no_back.png"; // Default fallback
  
  if (strapiArticle.image && strapiArticle.image.url) {
    imageUrl = getStrapiImageUrl(strapiArticle.image.url);
  }

  return {
    category: strapiArticle.category || "NEWS",
    categoryColor: getCategoryColor(strapiArticle.category || "NEWS"),
    title: strapiArticle.title || "Untitled",
    description: strapiArticle.description || "",
    timeAgo: getTimeAgo(strapiArticle.publishedAt || strapiArticle.createdAt),
    author: strapiArticle.author || "Unknown",
    imageUrl: imageUrl,
  };
}

/**
 * Transform an array of Strapi articles to NewsArticle format
 */
export function transformStrapiArticles(strapiArticles: StrapiArticle[]): NewsArticle[] {
  return strapiArticles.map(transformStrapiArticle);
}

