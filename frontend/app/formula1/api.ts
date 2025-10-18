/**
 * Formula1 API - Colocated with formula1 page
 */

import { Formula1Article } from "./types";
import { STRAPI_URL } from "./_lib";
import { transformArticle } from "./_lib";

interface FetchOptions {
  isCarousel?: boolean;
  isMainNews?: boolean;
  isHomeSportSection?: boolean;
  limit?: number;
}

/**
 * Fetch formula1 articles from Strapi
 */
export async function fetchFormula1Articles(options: FetchOptions = {}): Promise<Formula1Article[]> {
  try {
    const params = new URLSearchParams();
    
    // Add filters
    if (options.isCarousel !== undefined) {
      params.append('filters[isCarousel][$eq]', String(options.isCarousel));
    }
    if (options.isMainNews !== undefined) {
      params.append('filters[isMainNews][$eq]', String(options.isMainNews));
    }
    if (options.isHomeSportSection !== undefined) {
      params.append('filters[isHomeSportSection][$eq]', String(options.isHomeSportSection));
    }
    
    // Add pagination
    if (options.limit) {
      params.append('pagination[limit]', String(options.limit));
    }
    
    // Always populate image and sort by date (newest first)
    params.append('populate', 'image');
    params.append('sort', 'createdAt:desc');
    
    const response = await fetch(
      `${STRAPI_URL}/api/formula1-articles?${params.toString()}`,
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

