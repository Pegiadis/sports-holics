/**
 * Basketball API - Colocated with basketball page
 */

import { basketballApi } from "@/lib/sports-api";

export const fetchBasketballArticles = basketballApi.fetchArticles;
export const fetchBasketballArticlesWithPagination = basketballApi.fetchArticlesWithPagination;
