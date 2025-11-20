# Sports-Holics Codebase Refactoring Guide

This document details the refactoring performed and provides a guide for navigating the codebase.

---

## Table of Contents

1. [Refactoring Summary](#refactoring-summary)
2. [Architecture Overview](#architecture-overview)
3. [Directory Structure](#directory-structure)
4. [Key Patterns](#key-patterns)
5. [How to Navigate the Codebase](#how-to-navigate-the-codebase)
6. [Adding New Features](#adding-new-features)

---

## Refactoring Summary

### What Changed

| Before | After | Improvement |
|--------|-------|-------------|
| 3 identical type files (`football/types.ts`, etc.) | Single `BaseArticle` in `lib/sports-api.ts` | Eliminated ~150 lines of duplication |
| 3 sport-specific card components | Single `ArticleCard` component | Eliminated ~300 lines of duplication |
| 3 sport pages with 78 lines each | 3 pages with 33 lines each using `SportPageTemplate` | Reduced by 135 lines |
| 3 sport APIs with 28 lines each | 3 APIs with 9 lines each using factory | Reduced by 57 lines |
| Monolithic `homepage-api.ts` (567 lines) | Split into 4 focused modules | Better separation of concerns |
| Mixed `console.error`/`console.warn` | Consistent `console.warn` for API errors | Standardized error handling |
| English time strings | Greek time strings ("πριν από 5 λεπτά") | Proper localization |

### Files Created

```
frontend/
├── components/
│   ├── ArticleCard.tsx          # Generic article card (replaces 3 cards)
│   └── SportPageTemplate.tsx    # Reusable sport page layout
└── lib/
    ├── breaking-news-api.ts     # Breaking news ticker API
    ├── journalist-api.ts        # Journalist data API
    └── hero-api.ts              # Hero section API
```

### Files Deleted

```
frontend/app/
├── football/
│   ├── types.ts                 # Redundant (use BaseArticle)
│   └── FootballCard.tsx         # Redundant (use ArticleCard)
├── basketball/
│   ├── types.ts
│   └── BasketballCard.tsx
└── formula1/
    ├── types.ts
    └── Formula1Card.tsx
```

---

## Architecture Overview

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Strapi    │────>│  API Layer  │────>│   Next.js   │
│    CMS      │     │  (lib/*.ts) │     │   Pages     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           v
                    ┌─────────────┐
                    │ Components  │
                    │ (reusable)  │
                    └─────────────┘
```

### Layer Responsibilities

| Layer | Location | Purpose |
|-------|----------|---------|
| **Types** | `lib/sports-api.ts`, `types.ts` | TypeScript interfaces |
| **API** | `lib/*.ts`, `app/*/api.ts` | Fetch data from Strapi |
| **Pages** | `app/*/page.tsx` | Server Components, data orchestration |
| **Components** | `components/*.tsx` | Reusable UI elements |

---

## Directory Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (lang="el")
│   ├── page.tsx                  # Homepage
│   ├── homepage-api.ts           # Homepage data fetching
│   │
│   ├── football/                 # Sport pages (same structure)
│   │   ├── page.tsx              # Uses SportPageTemplate
│   │   └── api.ts                # Uses factory from sports-api
│   ├── basketball/
│   ├── formula1/
│   ├── news/
│   │
│   ├── article/[slug]/           # Article detail page
│   │   ├── page.tsx
│   │   └── api.ts
│   │
│   └── blog/                     # Blog/journalist pages
│       ├── page.tsx
│       ├── api.ts
│       ├── [journalist]/
│       └── [journalist]/[article]/
│
├── components/                   # Shared components
│   ├── Header.tsx                # Navigation
│   ├── Footer.tsx
│   ├── ArticleCard.tsx           # Generic article card
│   ├── SportPageTemplate.tsx     # Sport page layout
│   ├── NewsCarousel.tsx
│   ├── Pagination.tsx
│   └── OptimizedImage.tsx
│
├── lib/                          # Core utilities
│   ├── sports-api.ts             # Central API utilities + factory
│   ├── breaking-news-api.ts      # Breaking news API
│   ├── journalist-api.ts         # Journalist API
│   ├── hero-api.ts               # Hero section API
│   └── constants.ts              # Sport configs, colors
│
└── types.ts                      # Global TypeScript types
```

---

## Key Patterns

### 1. Factory Pattern for Sport APIs

**Location:** `lib/sports-api.ts`

Instead of duplicating API code for each sport, use the factory:

```typescript
// Configuration object
export const FOOTBALL_CONFIG: SportConfig = {
  endpoint: 'football-articles',
  category: 'ΠΟΔΟΣΦΑΙΡΟ',
  categoryColor: 'bg-green-100 text-green-800',
  fallbackImage: '/football.png',
};

// Factory creates API functions
export const footballApi = createSportApi(FOOTBALL_CONFIG);

// Usage in app/football/api.ts
export const fetchFootballArticles = footballApi.fetchArticles;
export const fetchFootballArticlesWithPagination = footballApi.fetchArticlesWithPagination;
```

### 2. Template Pattern for Sport Pages

**Location:** `components/SportPageTemplate.tsx`

All sport pages use the same layout:

```typescript
// app/football/page.tsx
export default async function FootballPage({ searchParams }) {
  const [{ articles, pagination }, latestNews, hotNews] = await Promise.all([
    fetchFootballArticlesWithPagination({ page: currentPage }),
    fetchLatestNews(),
    fetchCarouselNews(),
  ]);

  return (
    <SportPageTemplate
      emoji="⚽"
      title="Ποδόσφαιρο"
      description="Όλα τα νέα και οι ειδήσεις για το ποδόσφαιρο"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
```

### 3. Generic Components with Dynamic Styling

**Location:** `components/ArticleCard.tsx`

Single component handles all sport types:

```typescript
function getCategoryColors(category: string) {
  const colorMap = {
    'ΠΟΔΟΣΦΑΙΡΟ': { badge: 'bg-green-500', hover: 'hover:text-green-600' },
    'ΜΠΑΣΚΕΤ': { badge: 'bg-orange-500', hover: 'hover:text-orange-600' },
    'FORMULA 1': { badge: 'bg-red-500', hover: 'hover:text-red-600' },
    'NEWS': { badge: 'bg-purple-500', hover: 'hover:text-purple-600' },
  };
  return colorMap[category] || { badge: 'bg-gray-500', hover: 'hover:text-gray-600' };
}
```

### 4. Re-exports for Backwards Compatibility

**Location:** `app/homepage-api.ts`

When splitting modules, maintain imports:

```typescript
// Re-export types and functions
export type { BreakingNewsItem } from "@/lib/breaking-news-api";
export { fetchBreakingNews } from "@/lib/breaking-news-api";
```

---

## How to Navigate the Codebase

### Reading Order (Recommended)

1. **Start with types** - Understand data structures
   - `frontend/types.ts` - Global types (NewsArticle, SeoData)
   - `frontend/lib/sports-api.ts` - BaseArticle, SportConfig

2. **Understand the API layer** - How data is fetched
   - `frontend/lib/sports-api.ts` - Factory and core utilities
   - `frontend/lib/hero-api.ts` - Simple example of focused API

3. **See how pages use APIs** - Data orchestration
   - `frontend/app/football/page.tsx` - Simple sport page
   - `frontend/app/page.tsx` - Complex homepage

4. **Explore components** - UI building blocks
   - `frontend/components/ArticleCard.tsx` - Generic card
   - `frontend/components/SportPageTemplate.tsx` - Page template

### Key Files to Understand

| File | Purpose | Read When |
|------|---------|-----------|
| `lib/sports-api.ts` | Core API utilities, factory, types | First - foundation of everything |
| `app/homepage-api.ts` | Homepage data fetching | Understanding homepage |
| `components/ArticleCard.tsx` | How articles are displayed | Working on UI |
| `components/SportPageTemplate.tsx` | Sport page structure | Adding/modifying sport pages |
| `app/article/[slug]/api.ts` | Article detail fetching | Working on article pages |

### Finding Things

**Find where data comes from:**
```
Data displayed → Component → Page → API function → Strapi endpoint
```

**Find where to add new features:**
- New sport type → Add config to `lib/sports-api.ts`, create page in `app/`
- New homepage section → Add to `homepage-api.ts` or create new API in `lib/`
- New component → Add to `components/`

### Common Tasks

| Task | Where to Look |
|------|---------------|
| Change article card appearance | `components/ArticleCard.tsx` |
| Add field to articles | `lib/sports-api.ts` (BaseArticle interface) |
| Change sport page layout | `components/SportPageTemplate.tsx` |
| Add new API endpoint | Create in `lib/`, export from relevant `api.ts` |
| Modify fetching behavior | `lib/sports-api.ts` (fetchSportArticles) |
| Change sport colors | `lib/sports-api.ts` (sport configs) |

---

## Adding New Features

### Adding a New Sport (e.g., Tennis)

1. **Add configuration** in `lib/sports-api.ts`:
```typescript
export const TENNIS_CONFIG: SportConfig = {
  endpoint: 'tennis-articles',
  category: 'ΤΕΝΙΣ',
  categoryColor: 'bg-yellow-100 text-yellow-800',
  fallbackImage: '/tennis.png',
};

export const tennisApi = createSportApi(TENNIS_CONFIG);
```

2. **Create page directory** `app/tennis/`:
```typescript
// app/tennis/api.ts
import { tennisApi } from "@/lib/sports-api";
export const fetchTennisArticles = tennisApi.fetchArticles;
export const fetchTennisArticlesWithPagination = tennisApi.fetchArticlesWithPagination;

// app/tennis/page.tsx
import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchTennisArticlesWithPagination } from "./api";
// ... same pattern as football/page.tsx
```

3. **Add color mapping** in `components/ArticleCard.tsx`:
```typescript
'ΤΕΝΙΣ': { badge: 'bg-yellow-500', hover: 'hover:text-yellow-600' },
```

4. **Add to navigation** in `components/Header.tsx`

### Adding a New Homepage Section

1. **Create API function** in `lib/` or `homepage-api.ts`:
```typescript
export async function fetchFeaturedPodcasts(): Promise<PodcastData[]> {
  // ... fetch logic
}
```

2. **Call from homepage** `app/page.tsx`:
```typescript
const [articles, podcasts] = await Promise.all([
  fetchCarouselNews(),
  fetchFeaturedPodcasts(),
]);
```

3. **Create component** if needed in `components/`

### Modifying Article Display

1. **Add field to interface** in `lib/sports-api.ts`:
```typescript
export interface BaseArticle {
  // ... existing fields
  readTime?: number;  // New field
}
```

2. **Fetch the field** in `fetchSportArticles`:
```typescript
params.append('populate[5]', 'readTime');
```

3. **Display in component** `components/ArticleCard.tsx`:
```typescript
{article.readTime && (
  <span>{article.readTime} λεπτά ανάγνωσης</span>
)}
```

---

## API Patterns

### Standard Fetch Pattern

All APIs follow this pattern:

```typescript
export async function fetchSomething(): Promise<SomeType[]> {
  try {
    const params = new URLSearchParams();
    params.append('filters[isActive][$eq]', 'true');
    params.append('populate', '*');
    params.append('sort', 'createdAt:desc');

    const response = await fetch(
      `${STRAPI_URL}/api/endpoint?${params.toString()}`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',              // Real-time updates
        signal: AbortSignal.timeout(5000), // 5s timeout
      }
    );

    if (!response.ok) {
      console.warn('Failed to fetch:', response.status);
      return [];
    }

    const data = await response.json();
    return data.data?.map(transform) || [];
  } catch (error) {
    console.warn('Error fetching:', error);
    return [];  // Graceful degradation
  }
}
```

### Key Principles

- **No throwing in UI layer** - Return empty arrays/null
- **Consistent logging** - Use `console.warn` for API errors
- **Timeouts** - 5 seconds for all fetches
- **No caching** - `cache: 'no-store'` for real-time CMS updates
- **Parallel fetching** - Use `Promise.all` when possible

---

## Quick Reference

### Import Aliases

```typescript
import { BaseArticle, footballApi } from "@/lib/sports-api";
import ArticleCard from "@/components/ArticleCard";
import { NewsArticle } from "@/types";
```

### Sport Colors

| Sport | Badge | Hover | Config |
|-------|-------|-------|--------|
| Football | `bg-green-500` | `hover:text-green-600` | `FOOTBALL_CONFIG` |
| Basketball | `bg-orange-500` | `hover:text-orange-600` | `BASKETBALL_CONFIG` |
| Formula 1 | `bg-red-500` | `hover:text-red-600` | `FORMULA1_CONFIG` |
| News | `bg-purple-500` | `hover:text-purple-600` | - |

### Greek Text Constants

- Football: "ΠΟΔΟΣΦΑΙΡΟ"
- Basketball: "ΜΠΑΣΚΕΤ"
- Formula 1: "FORMULA 1"
- News: "NEWS"
- Time format: "πριν από X λεπτά/ώρες/ημέρες"
