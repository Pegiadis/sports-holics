/**
 * Football page types - Colocated with football page
 * Uses shared base types from sports-api
 */

import { BaseStrapiArticle, BaseArticle } from "@/lib/sports-api";

/**
 * Strapi response type for football articles
 * Uses base type (can be extended with football-specific fields if needed)
 */
export type StrapiFootballArticle = BaseStrapiArticle;

/**
 * Frontend type for football articles
 * Uses the base article type
 */
export type FootballArticle = BaseArticle;
