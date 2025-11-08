/**
 * Basketball API - Colocated with basketball page
 * Uses shared sports-api utilities
 */

import { fetchSportArticles, fetchSportArticlesWithPagination, FetchOptions, SportConfig, BaseArticle, PaginatedResponse } from "@/lib/sports-api";

// Basketball-specific configuration
const BASKETBALL_CONFIG: SportConfig = {
  endpoint: 'basketball-articles',
  category: 'ΜΠΑΣΚΕΤ',
  categoryColor: 'bg-orange-100 text-orange-800',
  fallbackImage: '/basket1.png',
};

/**
 * Fetch basketball articles from Strapi
 */
export async function fetchBasketballArticles(options: FetchOptions = {}): Promise<BaseArticle[]> {
  return fetchSportArticles(BASKETBALL_CONFIG, options);
}

/**
 * Fetch basketball articles with pagination metadata
 */
export async function fetchBasketballArticlesWithPagination(options: FetchOptions = {}): Promise<PaginatedResponse<BaseArticle>> {
  return fetchSportArticlesWithPagination(BASKETBALL_CONFIG, options);
}
