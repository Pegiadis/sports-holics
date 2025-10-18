/**
 * Football API - Colocated with football page
 * Uses shared sports-api utilities
 */

import { fetchSportArticles, FetchOptions, SportConfig, BaseArticle } from "@/lib/sports-api";

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
