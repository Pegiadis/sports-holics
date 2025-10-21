/**
 * Basketball API - Colocated with basketball page
 * Uses shared sports-api utilities
 */

import { fetchSportArticles, FetchOptions, SportConfig, BaseArticle } from "@/lib/sports-api";

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
