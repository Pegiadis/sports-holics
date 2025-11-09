/**
 * Blog API - Fetches blog articles and journalist data
 */

import { BlogArticleData, JournalistData } from "../homepage-api";

// Remove trailing slash from STRAPI_URL to prevent double slashes in API calls
const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_URL = rawStrapiUrl.endsWith('/') ? rawStrapiUrl.slice(0, -1) : rawStrapiUrl;

// Helper to calculate time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    χρόνο: 31536000,
    μήνα: 2592000,
    εβδομάδα: 604800,
    μέρα: 86400,
    ώρα: 3600,
    λεπτό: 60,
  };

  if (seconds < 60) return "μόλις τώρα";

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `πριν ${interval} ${unit}${interval > 1 && !unit.endsWith('α') ? 'ες' : ''}`;
    }
  }

  return "μόλις τώρα";
}

/**
 * Fetch journalist by slug with their articles
 */
export async function fetchJournalistBySlug(slug: string): Promise<JournalistData & { articleCount: number } | null> {
  try {
    const params = new URLSearchParams();
    params.append('filters[slug][$eq]', slug);
    params.append('populate', '*');

    const response = await fetch(
      `${STRAPI_URL}/api/journalists?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const journalist = data.data[0];

    return {
      id: journalist.id,
      name: journalist.name,
      slug: journalist.slug,
      title: journalist.title || '',
      bio: journalist.bio || '',
      avatarUrl: journalist.avatar?.url ? `${STRAPI_URL}${journalist.avatar.url}` : '/default-avatar.jpg',
      specialty: journalist.specialty || '',
      twitter: journalist.twitter || '',
      instagram: journalist.instagram || '',
      articleCount: journalist.blogArticles?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching journalist:', error);
    return null;
  }
}

/**
 * Fetch blog articles by journalist slug
 */
export async function fetchBlogArticlesByJournalist(journalistSlug: string): Promise<BlogArticleData[]> {
  try {
    // First get the journalist ID
    const journalistParams = new URLSearchParams();
    journalistParams.append('filters[slug][$eq]', journalistSlug);
    
    const journalistResponse = await fetch(
      `${STRAPI_URL}/api/journalists?${journalistParams.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!journalistResponse.ok) {
      console.warn('Failed to fetch journalist:', journalistResponse.status);
      return [];
    }

    const journalistData = await journalistResponse.json();
    
    if (!journalistData.data || journalistData.data.length === 0) {
      return [];
    }

    const journalistId = journalistData.data[0].id;

    // Now fetch articles by journalist ID
    // For now, fetch all articles and filter on client side
    // Strapi v4/v5 relation filters can be complex
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('sort[0]', 'publishedAt:desc');
    params.append('pagination[limit]', '100');

    const response = await fetch(
      `${STRAPI_URL}/api/blog-articles?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch blog articles:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    // Filter articles by journalist ID on client side
    const journalistArticles = data.data.filter((article: any) => 
      article.journalist?.id === journalistId
    );

    return journalistArticles.map((article: any) => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle || '',
      slug: article.slug,
      content: article.content || '',
      excerpt: article.excerpt || '',
      coverImageUrl: article.coverImage?.url ? `${STRAPI_URL}${article.coverImage.url}` : '/default-blog.jpg',
      category: article.category || '',
      tags: article.tags || [],
      readTime: article.readTime || 5,
      isFeatured: article.isFeatured || false,
      publishedAt: article.publishedAt || new Date().toISOString(),
      timeAgo: getTimeAgo(article.publishedAt || new Date().toISOString()),
      journalist: {
        id: article.journalist?.id || journalistId,
        name: article.journalist?.name || '',
        slug: article.journalist?.slug || journalistSlug,
        avatarUrl: article.journalist?.avatar?.url ? `${STRAPI_URL}${article.journalist.avatar.url}` : '/default-avatar.jpg',
      },
    }));
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return [];
  }
}

/**
 * Fetch single blog article by slug
 */
export async function fetchBlogArticleBySlug(slug: string): Promise<BlogArticleData | null> {
  try {
    const params = new URLSearchParams();
    params.append('filters[slug][$eq]', slug);
    params.append('populate[coverImage]', 'true');
    params.append('populate[journalist][populate][0]', 'avatar');

    const response = await fetch(
      `${STRAPI_URL}/api/blog-articles?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.warn(`No blog article found with slug: ${slug}`);
      return null;
    }

    const article = data.data[0];

    // Debug logging
    if (!article.journalist) {
      console.error('Blog article is missing journalist data:', article);
    }

    return {
      id: article.id,
      title: article.title,
      subtitle: article.subtitle || '',
      slug: article.slug,
      content: article.content || '',
      excerpt: article.excerpt || '',
      coverImageUrl: article.coverImage?.url ? `${STRAPI_URL}${article.coverImage.url}` : '/default-blog.jpg',
      category: article.category || '',
      tags: article.tags || [],
      readTime: article.readTime || 5,
      isFeatured: article.isFeatured || false,
      publishedAt: article.publishedAt || new Date().toISOString(),
      timeAgo: getTimeAgo(article.publishedAt || new Date().toISOString()),
      journalist: {
        id: article.journalist?.id || 0,
        name: article.journalist?.name || 'Unknown',
        slug: article.journalist?.slug || 'unknown',
        avatarUrl: article.journalist?.avatar?.url ? `${STRAPI_URL}${article.journalist.avatar.url}` : '/default-avatar.jpg',
      },
    };
  } catch (error) {
    console.error('Error fetching blog article:', error);
    return null;
  }
}

