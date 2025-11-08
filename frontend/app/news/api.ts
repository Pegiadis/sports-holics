import { NewsArticle } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

interface StrapiArticle {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  author?: string;
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
    params.append('populate', 'image');
    params.append('sort', 'createdAt:desc');
    params.append('pagination[page]', String(page));
    params.append('pagination[pageSize]', String(pageSize));

    const response = await fetch(
      `${STRAPI_URL}/api/news-articles?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Disable caching for real-time updates
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

    const articles = data.data.map((item: StrapiArticle) => {
      const getTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = {
          year: 31536000,
          month: 2592000,
          week: 604800,
          day: 86400,
          hour: 3600,
          minute: 60,
        };

        if (seconds < intervals.minute) return "just now";

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
          const interval = Math.floor(seconds / secondsInUnit);
          if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
          }
        }

        return "just now";
      };

      return {
        id: item.id,
        title: item.title || 'Untitled',
        subtitle: item.subtitle,
        description: item.description || '',
        author: item.author || 'Sports Holics',
        image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : '/default-news.jpg',
        slug: item.slug || '',
        date: item.publishedAt || item.createdAt,
        timeAgo: getTimeAgo(item.createdAt),
        category: 'NEWS',
        categoryColor: 'bg-purple-100 text-purple-800',
      };
    });

    const pagination: PaginationMeta = data.meta?.pagination || {
      page: 1,
      pageSize,
      pageCount: Math.ceil(articles.length / pageSize),
      total: articles.length
    };

    return { articles, pagination };
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return {
      articles: [],
      pagination: { page: 1, pageSize, pageCount: 0, total: 0 }
    };
  }
}

