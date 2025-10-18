/**
 * Formula1 page types - Colocated with formula1 page
 * Uses shared base types from sports-api
 */

import { BaseStrapiArticle, BaseArticle } from "@/lib/sports-api";

/**
 * Strapi response type for formula1 articles
 * Uses base type (can be extended with formula1-specific fields if needed)
 */
export type StrapiFormula1Article = BaseStrapiArticle;

/**
 * Frontend type for formula1 articles
 * Uses the base article type
 */
export type Formula1Article = BaseArticle;
