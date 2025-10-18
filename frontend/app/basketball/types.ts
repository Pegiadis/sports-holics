/**
 * Basketball page types - Colocated with basketball page
 */

/**
 * Strapi response type for basketball articles
 */
export interface StrapiBasketballArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    url: string;
    name: string;
    alternativeText: string | null;
  } | null;
}

/**
 * Frontend type for basketball articles
 */
export interface BasketballArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  timeAgo: string;
  slug: string;
}

