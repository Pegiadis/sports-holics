/**
 * Football API - Colocated with football page
 */

import { footballApi } from "@/lib/sports-api";

export const fetchFootballArticles = footballApi.fetchArticles;
export const fetchFootballArticlesWithPagination = footballApi.fetchArticlesWithPagination;
