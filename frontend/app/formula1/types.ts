/**
 * Formula1 page types - Colocated with formula1 page
 */

/**
 * Strapi response type for formula1 articles
 */
export interface StrapiFormula1Article {
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
 * Frontend type for formula1 articles
 */
export interface Formula1Article {
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

