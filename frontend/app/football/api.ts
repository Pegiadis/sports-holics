/**
 * Football API - Colocated with football page
 * Uses shared sports-api utilities
 */

import { fetchSportArticles, fetchSportArticlesWithPagination, FetchOptions, SportConfig, BaseArticle, PaginatedResponse } from "@/lib/sports-api";

// Football-specific configuration
const FOOTBALL_CONFIG: SportConfig = {
  endpoint: 'football-articles',
  category: 'ΠΟΔΟΣΦΑΙΡΟ',
  categoryColor: 'bg-green-100 text-green-800',
  fallbackImage: '/football.png',
};

/**
 * Fetch football articles from Strapi
 */
export async function fetchFootballArticles(options: FetchOptions = {}): Promise<BaseArticle[]> {
  return fetchSportArticles(FOOTBALL_CONFIG, options);
}

/**
 * Fetch football articles with pagination metadata
 */
export async function fetchFootballArticlesWithPagination(options: FetchOptions = {}): Promise<PaginatedResponse<BaseArticle>> {
  return fetchSportArticlesWithPagination(FOOTBALL_CONFIG, options);
}
