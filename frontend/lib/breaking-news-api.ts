/**
 * Breaking News API
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export interface BreakingNewsItem {
  id: number;
  text: string;
  link?: string;
}

/**
 * Fetch active breaking news items
 */
export async function fetchBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'createdAt:desc');
    params.append('pagination[limit]', '10');

    const response = await fetch(
      `${STRAPI_URL}/api/breaking-news-items?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch breaking news:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((item: { id: number; text: string; link?: string }) => ({
      id: item.id,
      text: item.text,
      link: item.link || undefined,
    }));
  } catch (error) {
    console.warn('Error fetching breaking news:', error);
    return [];
  }
}
