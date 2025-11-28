/**
 * Hero Section API
 */

import { getImageUrl } from './sports-api';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export interface HeroSectionData {
  id: number;
  title: string;
  titleHighlight?: string;
  description: string;
  categoryLabel: string;
  categoryEmoji?: string;
  timeAgo?: string;
  buttonText: string;
  buttonLink?: string;
  backgroundImageUrl: string;
}

/**
 * Fetch active hero section content
 */
export async function fetchHeroSection(): Promise<HeroSectionData | null> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('populate[0]', 'backgroundImage');
    params.append('populate[1]', 'linkedFootballArticle');
    params.append('populate[2]', 'linkedBasketballArticle');
    params.append('populate[3]', 'linkedFormula1Article');
    params.append('populate[4]', 'linkedNewsArticle');
    params.append('pagination[limit]', '1');

    const response = await fetch(
      `${STRAPI_URL}/api/hero-sections?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch hero section:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const hero = data.data[0];

    // Extract URL from background image (can be object or string)
    let backgroundImageUrl: string | undefined;
    if (typeof hero.backgroundImage === 'string') {
      backgroundImageUrl = hero.backgroundImage;
    } else if (hero.backgroundImage && typeof hero.backgroundImage === 'object') {
      backgroundImageUrl = hero.backgroundImage.url;
    }

    const finalImageUrl = getImageUrl(backgroundImageUrl, '/216-scaled-1.jpg');

    // Generate buttonLink from linked article
    let buttonLink = '#';
    if (hero.linkedFootballArticle?.slug) {
      buttonLink = `/article/${hero.linkedFootballArticle.slug}`;
    } else if (hero.linkedBasketballArticle?.slug) {
      buttonLink = `/article/${hero.linkedBasketballArticle.slug}`;
    } else if (hero.linkedFormula1Article?.slug) {
      buttonLink = `/article/${hero.linkedFormula1Article.slug}`;
    } else if (hero.linkedNewsArticle?.slug) {
      buttonLink = `/article/${hero.linkedNewsArticle.slug}`;
    }

    return {
      id: hero.id,
      title: hero.title || 'Τελικός Champions League',
      titleHighlight: hero.titleHighlight || 'Έτοιμος για Επική Αναμέτρηση',
      description: hero.description || 'Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη.',
      categoryLabel: hero.categoryLabel || 'Ποδόσφαιρο',
      categoryEmoji: hero.categoryEmoji || '🔥',
      timeAgo: hero.timeAgo || '5 λεπτά πριν',
      buttonText: hero.buttonText || 'Διαβάστε περισσότερα →',
      buttonLink: buttonLink,
      backgroundImageUrl: finalImageUrl,
    };
  } catch (error) {
    console.warn('Error fetching hero section:', error);
    return null;
  }
}
