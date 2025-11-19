/**
 * Journalist API
 */

import { getImageUrl } from './sports-api';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export interface JournalistData {
  id: number;
  name: string;
  slug: string;
  title?: string;
  bio?: string;
  avatarUrl: string;
  specialty?: string;
  twitter?: string;
  instagram?: string;
}

/**
 * Fetch active journalists
 */
export async function fetchJournalists(): Promise<JournalistData[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'name:asc');
    params.append('populate', 'avatar');

    const response = await fetch(
      `${STRAPI_URL}/api/journalists?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch journalists:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((item: {
      id: number;
      name: string;
      slug: string;
      title?: string;
      bio?: string;
      avatar?: { url?: string };
      specialty?: string;
      twitter?: string;
      instagram?: string;
    }) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      title: item.title || '',
      bio: item.bio || '',
      avatarUrl: getImageUrl(item.avatar?.url, '/default-avatar.jpg'),
      specialty: item.specialty || '',
      twitter: item.twitter || '',
      instagram: item.instagram || '',
    }));
  } catch (error) {
    console.warn('Error fetching journalists:', error);
    return [];
  }
}
