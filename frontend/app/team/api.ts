/**
 * Team API - Fetches articles by team
 */

import { getImageUrl, getTimeAgo } from "@/lib/sports-api";
import { NewsArticle, TeamInfo } from "@/types";

// Remove trailing slash from STRAPI_URL to prevent double slashes in API calls
const rawStrapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_URL = rawStrapiUrl.endsWith('/') ? rawStrapiUrl.slice(0, -1) : rawStrapiUrl;

// Strapi response types
interface StrapiArticle {
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
  journalist?: {
    id: number;
    name?: string;
    slug?: string;
    avatar?: { url?: string };
  };
  team?: {
    id: number;
    name: string;
    slug: string;
    hasFootball?: boolean;
    hasBasketball?: boolean;
    hasAutoMoto?: boolean;
    logo?: { url?: string };
  };
}

// Helper to build sports array from boolean fields
function buildSportsArray(team: {
  hasFootball?: boolean;
  hasBasketball?: boolean;
  hasAutoMoto?: boolean;
}): string[] {
  const sports: string[] = [];
  if (team.hasFootball) sports.push('Ποδόσφαιρο');
  if (team.hasBasketball) sports.push('Μπάσκετ');
  if (team.hasAutoMoto) sports.push('Auto Moto');
  return sports;
}

export interface TeamArticle extends NewsArticle {
  isBlog: boolean;
  linkHref: string;
  publishedAt: string;
}

/**
 * Fetch all articles for a specific team
 * @param teamSlug - The team's slug
 * @param sort - Sort order: 'desc' for newest first, 'asc' for oldest first
 */
export async function fetchArticlesByTeam(
  teamSlug: string,
  sort: 'desc' | 'asc' = 'desc'
): Promise<TeamArticle[]> {
  try {
    // Fetch from football, basketball, and blog endpoints in parallel
    const endpoints = [
      { url: 'football-articles', category: 'ΠΟΔΟΣΦΑΙΡΟ', color: 'bg-green-100 text-green-800', isBlog: false },
      { url: 'basketball-articles', category: 'ΜΠΑΣΚΕΤ', color: 'bg-orange-100 text-orange-800', isBlog: false },
      { url: 'blog-articles', category: 'Blog', color: 'bg-blue-100 text-blue-800', isBlog: true },
    ];

    const fetchPromises = endpoints.map(async (endpoint) => {
      try {
        const params = new URLSearchParams();
        params.append('populate[0]', endpoint.isBlog ? 'coverImage' : 'image');
        params.append('populate[1]', endpoint.isBlog ? 'journalist' : 'author');
        params.append('populate[2]', endpoint.isBlog ? 'journalist.avatar' : 'author.avatar');
        params.append('populate[3]', 'team');
        params.append('populate[4]', 'team.logo');
        // Filter by team slug on the server side
        params.append('filters[team][slug][$eq]', teamSlug);
        params.append('sort[0]', `createdAt:${sort}`);
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

        // Transform to unified format
        return data.data.map((article: StrapiArticle): TeamArticle => {
          const authorData = endpoint.isBlog ? article.journalist : article.author;
          const authorSlug = authorData?.slug || '';
          
          // Build team info if present
          const teamInfo: TeamInfo | undefined = article.team ? {
            id: article.team.id,
            name: article.team.name,
            slug: article.team.slug,
            sports: buildSportsArray(article.team),
            logoUrl: getImageUrl(article.team.logo?.url, '/default-team.png'),
          } : undefined;

          return {
            id: article.id,
            title: article.title,
            subtitle: article.subtitle || '',
            description: article.excerpt || article.subtitle || '',
            slug: article.slug,
            imageUrl: getImageUrl(
              endpoint.isBlog ? article.coverImage?.url : article.image?.url, 
              endpoint.isBlog ? '/default-blog.jpg' : '/default-news.jpg'
            ),
            category: endpoint.category,
            categoryColor: endpoint.color,
            publishedAt: article.createdAt,
            timeAgo: getTimeAgo(article.createdAt),
            author: authorData?.name || 'Sports Holics',
            isBlog: endpoint.isBlog,
            team: teamInfo,
            // For blog articles, use journalist slug in URL
            // For sports articles, use /article/slug
            linkHref: endpoint.isBlog 
              ? `/blog/${authorSlug}/${article.slug}`
              : `/article/${article.slug}`,
          };
        });
      } catch (error) {
        console.warn(`Failed to fetch ${endpoint.url}:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const allArticles = results.flat();

    // Sort by published date
    allArticles.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      if (sort === 'desc') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

    return allArticles;
  } catch (error) {
    console.warn('Error fetching articles by team:', error);
    return [];
  }
}

/**
 * Count articles for a specific team
 */
export async function countArticlesByTeam(teamSlug: string): Promise<number> {
  try {
    const articles = await fetchArticlesByTeam(teamSlug);
    return articles.length;
  } catch (error) {
    console.warn('Error counting articles by team:', error);
    return 0;
  }
}

