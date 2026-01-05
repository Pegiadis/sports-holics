/**
 * Blog API - Fetches blog articles and journalist data
 */

import { BlogArticleData, JournalistData } from "../homepage-api";
import { getImageUrl, getTimeAgo } from "@/lib/sports-api";

// Remove trailing slash from STRAPI_URL to prevent double slashes in API calls
const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_URL = rawStrapiUrl.endsWith('/') ? rawStrapiUrl.slice(0, -1) : rawStrapiUrl;

// Strapi response types
interface StrapiBlogArticle {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  content?: string;
  excerpt?: string;
  coverImage?: { url?: string };
  image?: { url?: string };
  category?: string;
  readTime?: number;
  publishedAt?: string;
  createdAt: string;
  journalist?: {
    id: number;
    name?: string;
    slug?: string;
    avatar?: { url?: string };
  };
}

interface StrapiSportArticle {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt: string;
  image?: { url?: string };
  coverImage?: { url?: string };
  author?: {
    id: number;
    name?: string;
    slug?: string;
    avatar?: { url?: string };
  };
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

    // Blog articles count from relation (sports articles are counted via fetchAllArticlesByJournalist)
    const blogArticleCount = journalist.blogArticles?.length || 0;

    return {
      id: journalist.id,
      name: journalist.name,
      slug: journalist.slug,
      title: journalist.title || '',
      bio: journalist.bio || '',
      avatarUrl: getImageUrl(journalist.avatar?.url, '/default-avatar.jpg'),
      specialty: journalist.specialty || '',
      twitter: journalist.twitter || '',
      instagram: journalist.instagram || '',
      articleCount: blogArticleCount, // Will be updated with actual count from page
    };
  } catch (error) {
    console.warn('Error fetching journalist:', error);
    return null;
  }
}

/**
 * Fetch blog articles by journalist slug
 */
export async function fetchBlogArticlesByJournalist(journalistSlug: string): Promise<BlogArticleData[]> {
  try {
    // Fetch articles filtered by journalist slug on the server side
    const params = new URLSearchParams();
    params.append('populate', '*');
    // Filter by journalist slug on the server (much more efficient than client-side filtering)
    params.append('filters[journalist][slug][$eq]', journalistSlug);
    params.append('sort[0]', 'createdAt:desc');
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

    // Articles are already filtered by journalist slug on the server
    return data.data.map((article: StrapiBlogArticle) => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle || '',
      slug: article.slug,
      content: article.content || '',
      coverImageUrl: getImageUrl(article.coverImage?.url, '/default-blog.jpg'),
      category: article.category || '',
      readTime: article.readTime || 5,
      publishedAt: article.createdAt,  // Use createdAt as it never changes when editing
      timeAgo: getTimeAgo(article.createdAt),
      journalist: {
        id: article.journalist?.id || 0,
        name: article.journalist?.name || '',
        slug: article.journalist?.slug || journalistSlug,
        avatarUrl: getImageUrl(article.journalist?.avatar?.url, '/default-avatar.jpg'),
      },
    }));
  } catch (error) {
    console.warn('Error fetching blog articles:', error);
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
    params.append('populate[seo]', 'true');
    params.append('populate[seo][populate][0]', 'metaImage');
    params.append('populate[seo][populate][1]', 'metaSocial');
    params.append('populate[seo][populate][2]', 'metaSocial.image');
    // Populate dynamic zone components with all nested fields including media
    // This ensures text-block, video-embed, image-embed, social-media-embed, and table components are fully populated
    params.append('populate[content][on][article.text-block][populate]', '*');
    params.append('populate[content][on][article.video-embed][populate]', '*');
    params.append('populate[content][on][article.image-embed][populate][image][fields][0]', 'url');
    params.append('populate[content][on][article.image-embed][populate][image][fields][1]', 'alternativeText');
    params.append('populate[content][on][article.image-embed][populate][image][fields][2]', 'width');
    params.append('populate[content][on][article.image-embed][populate][image][fields][3]', 'height');
    params.append('populate[content][on][article.social-media-embed][populate]', '*');
    params.append('populate[content][on][article.table][populate]', '*');

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
      coverImageUrl: getImageUrl(article.coverImage?.url, '/default-blog.jpg'),
      category: article.category || '',
      readTime: article.readTime || 5,
      publishedAt: article.createdAt,  // Use createdAt as it never changes when editing
      timeAgo: getTimeAgo(article.createdAt),
      journalist: {
        id: article.journalist?.id || 0,
        name: article.journalist?.name || 'Unknown',
        slug: article.journalist?.slug || 'unknown',
        avatarUrl: getImageUrl(article.journalist?.avatar?.url, '/default-avatar.jpg'),
      },
      seo: article.seo || null,
    };
  } catch (error) {
    console.warn('Error fetching blog article:', error);
    return null;
  }
}

/**
 * Fetch ALL articles (blog + sports) by journalist slug
 * Returns a unified list of all article types
 */
export async function fetchAllArticlesByJournalist(journalistSlug: string): Promise<any[]> {
  try {
    // Filter articles by journalist slug directly (more reliable than id in Strapi v5)
    // Fetch from all article endpoints in parallel
    const endpoints = [
      { url: 'blog-articles', category: 'Blog', color: 'bg-blue-100 text-blue-800', isBlog: true },
      { url: 'football-articles', category: 'ΠΟΔΟΣΦΑΙΡΟ', color: 'bg-green-100 text-green-800', isBlog: false },
      { url: 'basketball-articles', category: 'ΜΠΑΣΚΕΤ', color: 'bg-orange-100 text-orange-800', isBlog: false },
      { url: 'formula1-articles', category: 'AUTO MOTO', color: 'bg-blue-100 text-blue-800', isBlog: false },
    ];

    const fetchPromises = endpoints.map(async (endpoint) => {
      try {
        const params = new URLSearchParams();
        params.append('populate[0]', endpoint.isBlog ? 'coverImage' : 'image');
        params.append('populate[1]', endpoint.isBlog ? 'journalist' : 'author');
        params.append('populate[2]', endpoint.isBlog ? 'journalist.avatar' : 'author.avatar');
        // Filter by author/journalist slug on the server side (much more efficient)
        const authorField = endpoint.isBlog ? 'journalist' : 'author';
        params.append(`filters[${authorField}][slug][$eq]`, journalistSlug);
        params.append('sort[0]', 'createdAt:desc');
        params.append('pagination[limit]', '100');

        const response = await fetch(
          `${STRAPI_URL}/api/${endpoint.url}?${params.toString()}`,
          {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
            signal: AbortSignal.timeout(5000),
          }
        );

        if (!response.ok) return [];
        const data = await response.json();
        if (!data.data || data.data.length === 0) return [];

        // Articles are already filtered by author slug on the server side
        // Transform to unified format
        return data.data.map((article: StrapiBlogArticle | StrapiSportArticle) => ({
          id: article.id,
          title: article.title,
          subtitle: article.subtitle || '',
          slug: article.slug,
          excerpt: article.excerpt || article.subtitle || '',
          imageUrl: getImageUrl(
            endpoint.isBlog ? article.coverImage?.url : article.image?.url, 
            endpoint.isBlog ? '/default-blog.jpg' : '/default-news.jpg'
          ),
          category: endpoint.category,
          categoryColor: endpoint.color,
          publishedAt: article.createdAt,  // Use createdAt as it never changes when editing
          timeAgo: getTimeAgo(article.createdAt),
          isBlog: endpoint.isBlog,
          // For blog articles, use journalist slug in URL
          // For sports articles, use /article/slug
          linkHref: endpoint.isBlog 
            ? `/blog/${journalistSlug}/${article.slug}`
            : `/article/${article.slug}`,
        }));
      } catch (error) {
        console.warn(`Failed to fetch ${endpoint.url}:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const allArticles = results.flat();

    // Sort by published date (newest first)
    allArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    return allArticles;
  } catch (error) {
    console.warn('Error fetching all articles by journalist:', error);
    return [];
  }
}

