/**
 * Football API - Colocated with football page
 */

import { FootballArticle } from "./types";
import { STRAPI_URL } from "./_lib";
import { transformArticle } from "./_lib";


/**
   * Fetch all football articles from Strapi
   */
export async function fetchFootballArticles(): Promise<FootballArticle[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/football-articles?populate=image&sort=createdAt:desc`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data.map(transformArticle);
    }

    return [];
  } catch (error) {
    console.warn('Strapi CMS is not available:', error);
    return [];
  }
}