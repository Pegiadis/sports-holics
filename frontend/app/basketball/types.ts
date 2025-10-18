/**
 * Basketball page types - Colocated with basketball page
 * Uses shared base types from sports-api
 */

import { BaseStrapiArticle, BaseArticle } from "@/lib/sports-api";

/**
 * Strapi response type for basketball articles
 * Uses base type (can be extended with basketball-specific fields if needed)
 */
export type StrapiBasketballArticle = BaseStrapiArticle;

/**
 * Frontend type for basketball articles
 * Uses the base article type
 */
export type BasketballArticle = BaseArticle;
