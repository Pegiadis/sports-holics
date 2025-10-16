/**
 * Strapi API Configuration and Service
 */

// API Configuration
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

/**
 * Strapi API response types
 */
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Record<string, unknown> | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiArticleAttributes {
  title: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  isFeatured: boolean;
  isCarousel: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: StrapiImage | null;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  isFeatured: boolean;
  isCarousel: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: StrapiImage | null;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch articles from Strapi API
 */
export async function fetchArticles(params?: {
  isCarousel?: boolean;
  isFeatured?: boolean;
  limit?: number;
}): Promise<StrapiResponse<StrapiArticle[]>> {
  try {
    const queryParams = new URLSearchParams();
    
    // Add filters
    if (params?.isCarousel !== undefined) {
      queryParams.append('filters[isCarousel][$eq]', String(params.isCarousel));
    }
    if (params?.isFeatured !== undefined) {
      queryParams.append('filters[isFeatured][$eq]', String(params.isFeatured));
    }
    
    // Add pagination
    if (params?.limit) {
      queryParams.append('pagination[limit]', String(params.limit));
    }
    
    // Populate image
    queryParams.append('populate', 'image');
    
    // Sort by custom order field (ascending), then by creation date
    queryParams.append('sort[0]', 'order:asc');
    queryParams.append('sort[1]', 'createdAt:desc');

    const url = `${STRAPI_API_URL}/api/articles?${queryParams.toString()}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      // Return empty data instead of throwing
      console.warn(`Strapi API returned ${response.status}: ${response.statusText}`);
      return { data: [], meta: {} };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error but return empty data instead of throwing
    if (error instanceof Error) {
      console.warn('Strapi CMS is not available, using fallback data:', error.message);
    } else {
      console.warn('Strapi CMS is not available, using fallback data');
    }
    
    // Return empty data structure so the app continues to work
    return { data: [], meta: {} };
  }
}

/**
 * Fetch a single article by ID
 */
export async function fetchArticleById(id: number): Promise<StrapiResponse<StrapiArticle> | null> {
  try {
    const url = `${STRAPI_API_URL}/api/articles/${id}?populate=image`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('Strapi CMS is not available:', error.message);
    }
    return null;
  }
}

/**
 * Fetch a single article by slug
 */
export async function fetchArticleBySlug(slug: string): Promise<StrapiResponse<StrapiArticle[]>> {
  try {
    const url = `${STRAPI_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=image`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.warn(`Strapi API returned ${response.status}: ${response.statusText}`);
      return { data: [], meta: {} };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.warn('Strapi CMS is not available:', error.message);
    }
    return { data: [], meta: {} };
  }
}

/**
 * Helper function to get the full image URL from Strapi
 */
export function getStrapiImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return '';
  
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Otherwise, prepend the Strapi API URL
  return `${STRAPI_API_URL}${imageUrl}`;
}

