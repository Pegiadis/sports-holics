/**
 * Team API - Fetch teams from Strapi CMS
 */

import { getImageUrl } from './sports-api';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export interface TeamData {
  id: number;
  name: string;
  slug: string;
  sports: string[];  // Array of sports: ["Ποδόσφαιρο", "Μπάσκετ"]
  logoUrl: string;
  description?: string;
}

export interface TeamWithArticleCount extends TeamData {
  articleCount: number;
}

// Helper to build sports array from boolean fields
function buildSportsArray(item: {
  hasFootball?: boolean;
  hasBasketball?: boolean;
  hasAutoMoto?: boolean;
}): string[] {
  const sports: string[] = [];
  if (item.hasFootball) sports.push('Ποδόσφαιρο');
  if (item.hasBasketball) sports.push('Μπάσκετ');
  if (item.hasAutoMoto) sports.push('Auto Moto');
  return sports;
}

/**
 * Fetch active teams
 * @param sport - Optional sport to filter by ("Ποδόσφαιρο" or "Μπάσκετ")
 */
export async function fetchTeams(sport?: string): Promise<TeamData[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('sort[0]', 'priority:desc');
    params.append('sort[1]', 'name:asc');
    params.append('populate', 'logo');

    const response = await fetch(
      `${STRAPI_URL}/api/teams?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch teams:', response.status);
      return [];
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    let teams = data.data.map((item: {
      id: number;
      name: string;
      slug: string;
      hasFootball?: boolean;
      hasBasketball?: boolean;
      hasAutoMoto?: boolean;
      logo?: { url?: string };
      description?: string;
    }) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      sports: buildSportsArray(item),
      logoUrl: getImageUrl(item.logo?.url, '/default-team.png'),
      description: item.description || '',
    }));

    // Filter by sport if provided (check if sport is in the sports array)
    if (sport) {
      teams = teams.filter((team: TeamData) => team.sports.includes(sport));
    }

    return teams;
  } catch (error) {
    console.warn('Error fetching teams:', error);
    return [];
  }
}

/**
 * Fetch a single team by slug
 */
export async function fetchTeamBySlug(slug: string): Promise<TeamData | null> {
  try {
    const params = new URLSearchParams();
    params.append('filters[slug][$eq]', slug);
    params.append('populate', 'logo');

    const response = await fetch(
      `${STRAPI_URL}/api/teams?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
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

    const team = data.data[0];

    return {
      id: team.id,
      name: team.name,
      slug: team.slug,
      sports: buildSportsArray(team),
      logoUrl: getImageUrl(team.logo?.url, '/default-team.png'),
      description: team.description || '',
    };
  } catch (error) {
    console.warn('Error fetching team:', error);
    return null;
  }
}

/**
 * Get sport badge color based on sport type
 */
export function getSportBadgeColor(sport: string): string {
  switch (sport) {
    case 'Ποδόσφαιρο':
      return 'bg-green-100 text-green-800';
    case 'Μπάσκετ':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
