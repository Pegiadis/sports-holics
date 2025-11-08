/**
 * Formula1 API - Colocated with formula1 page
 * Uses shared sports-api utilities
 */

import { fetchSportArticles, fetchSportArticlesWithPagination, FetchOptions, SportConfig, BaseArticle, PaginatedResponse } from "@/lib/sports-api";

// Formula1-specific configuration
const FORMULA1_CONFIG: SportConfig = {
  endpoint: 'formula1-articles',
  category: 'FORMULA 1',
  categoryColor: 'bg-red-100 text-red-800',
  fallbackImage: '/f1.png',
};

/**
 * Fetch formula1 articles from Strapi
 */
export async function fetchFormula1Articles(options: FetchOptions = {}): Promise<BaseArticle[]> {
  return fetchSportArticles(FORMULA1_CONFIG, options);
}

/**
 * Fetch formula1 articles with pagination metadata
 */
export async function fetchFormula1ArticlesWithPagination(options: FetchOptions = {}): Promise<PaginatedResponse<BaseArticle>> {
  return fetchSportArticlesWithPagination(FORMULA1_CONFIG, options);
}
