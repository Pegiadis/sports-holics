import { NewsArticle } from "@/types";
import { getImageUrl, getTimeAgo } from "@/lib/sports-api";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface StrapiArticle {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  author?: {
    id: number;
    name: string;
    slug: string;
    avatar?: {
      url: string;
    } | null;
  } | null;
  slug?: string;
  createdAt: string;
  publishedAt?: string;
  image?: {
    url?: string;
  } | null;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedNewsResponse {
  articles: NewsArticle[];
  pagination: PaginationMeta;
}

export async function fetchNewsArticles(page?: number, pageSize: number = 10): Promise<NewsArticle[]> {
  const result = await fetchNewsArticlesWithPagination(page, pageSize);
  return result.articles;
}

export async function fetchNewsArticlesWithPagination(page: number = 1, pageSize: number = 10): Promise<PaginatedNewsResponse> {
  try {
    const params = new URLSearchParams();
    params.append('populate[0]', 'image');
    params.append('populate[1]', 'author');
    params.append('populate[2]', 'author.avatar');
    params.append('sort', 'createdAt:desc');
    params.append('pagination[page]', String(page));
    params.append('pagination[pageSize]', String(pageSize));

    const response = await fetch(
      `${STRAPI_URL}/api/news-articles?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Real-time updates from CMS
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch news articles:', response.status);
      return {
        articles: [],
        pagination: { page: 1, pageSize, pageCount: 0, total: 0 }
      };
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return {
        articles: [],
        pagination: { page: 1, pageSize, pageCount: 0, total: 0 }
      };
    }

    const articles = data.data.map((item: StrapiArticle) => ({
      id: item.id,
      title: item.title || 'Untitled',
      subtitle: item.subtitle,
      description: item.description || '',
      author: item.author?.name || 'Sports Holics',
      image: getImageUrl(item.image?.url, '/default-news.jpg'),
      slug: item.slug || '',
      date: item.publishedAt || item.createdAt,
      timeAgo: getTimeAgo(item.createdAt),
      category: 'NEWS',
      categoryColor: 'bg-purple-100 text-purple-800',
    }));

    const pagination: PaginationMeta = data.meta?.pagination || {
      page: 1,
      pageSize,
      pageCount: Math.ceil(articles.length / pageSize),
      total: articles.length
    };

    return { articles, pagination };
  } catch (error) {
    console.warn('Error fetching news articles:', error);
    return {
      articles: [],
      pagination: { page: 1, pageSize, pageCount: 0, total: 0 }
    };
  }
}

