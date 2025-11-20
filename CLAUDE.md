# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sports-Holics is a Greek sports news website with three main components:
- **frontend/**: Next.js 15 App Router application (main site)
- **backend/sportsholics-cms/**: Strapi v5 headless CMS
- **landing-page/**: Vite + React standalone landing page

## Essential Commands

### Frontend (Next.js)
```bash
cd frontend
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run all Jest tests
npm test:watch       # Run tests in watch mode
npm test:coverage    # Generate coverage report

# Run specific test file
npm test -- app/football/__tests__/FootballCard.test.tsx
```

### Backend (Strapi CMS)
```bash
cd backend/sportsholics-cms
npm run dev          # Development server (http://localhost:1337)
npm run develop      # Alternative development command
npm run build        # Build Strapi admin panel
npm run start        # Start production server
npm run create-admin # Create admin user (requires setup)

# Data seeding & cleanup
node scripts/seed-all-data.js       # Seed test data (69 entries)
node scripts/cleanup-all-data.js    # Delete all data (with confirmation)
node scripts/cleanup-selective.js   # Interactive cleanup
```

### Landing Page (Vite)
```bash
cd landing-page
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Architecture

### Data Flow
1. **Content Creation**: Editors create/edit content in Strapi admin (`localhost:1337/admin`)
2. **API Layer**: Strapi exposes REST API endpoints at `/api/{collection-type}`
3. **Frontend Consumption**: Next.js Server Components fetch from Strapi API
4. **Rendering**: Server-side rendering with real-time data (no caching)

### Key Architectural Patterns
- **Server Components First**: Default to Server Components, only use Client Components when needed (interactivity, browser APIs)
- **Colocated APIs**: Each route has its own `api.ts` file that uses shared utilities from `@/lib/sports-api.ts`
- **Generic Sport API**: Single `fetchSportArticles<T>()` function works for all sports via configuration objects
- **No Data Caching**: All fetches use `cache: 'no-store'` for real-time CMS updates
- **5-Second Timeouts**: All API calls use `AbortSignal.timeout(5000)` to prevent hanging
- **Graceful Degradation**: API errors return empty arrays, never throw in UI layer

### Strapi Content Types
The CMS defines these collection types (in `backend/sportsholics-cms/src/api/`):
- `football-articles` - Football news
- `basketball-articles` - Basketball news
- `formula1-articles` - Formula 1 news
- `news-articles` - General sports news
- `blog-articles` - Journalist blog posts
- `journalist` - Author profiles with avatars
- `breaking-news` - Breaking news ticker items
- `carousel-slot` - Homepage carousel configuration
- `hero-section` - Homepage hero content
- `homepage-configuration` - Homepage layout settings

### Frontend Structure
```
frontend/
├── app/                      # Next.js App Router
│   ├── [sport]/             # Dynamic sport pages (football, basketball, formula1)
│   │   ├── page.tsx         # Main sport page (Server Component)
│   │   ├── api.ts           # Sport-specific API calls
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── [Sport]Card.tsx  # Article card component
│   │   └── __tests__/       # Jest tests
│   ├── article/[slug]/      # Article detail pages
│   ├── blog/[journalist]/   # Journalist pages
│   ├── layout.tsx           # Root layout (lang="el")
│   └── globals.css          # Tailwind + custom animations
├── components/              # Shared components
│   ├── Header.tsx           # Navigation (Greek text)
│   ├── Footer.tsx
│   ├── NewsCarousel.tsx     # Homepage carousel
│   ├── Pagination.tsx       # List pagination
│   └── OptimizedImage.tsx   # Next.js Image wrapper
├── lib/
│   ├── sports-api.ts        # Generic API utilities
│   └── constants.ts         # Sport configs, colors
└── types.ts                 # Global TypeScript types
```

## TypeScript Conventions

### Strict Typing Requirements
- **No implicit `any`**: Always provide explicit types
- **Interface over Type**: Use `interface` for data structures, `type` for unions/intersections
- **Function Signatures**: Explicitly type all parameters and return types
- **Generics**: Use generics for shared utilities (see `fetchSportArticles<T>()`)

### Common Interfaces
```typescript
// Base article structure (from sports-api.ts)
interface BaseArticle {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  author: string;
  authorName?: string;
  authorSlug?: string;
  authorAvatarUrl?: string;
  imageUrl: string;
  category: string;          // Greek: "ΠΟΔΟΣΦΑΙΡΟ", "ΜΠΑΣΚΕΤ", etc.
  categoryColor: string;     // Tailwind classes
  timeAgo: string;
  slug: string;
  seo?: SeoData | null;
}

// Sport configuration object
interface SportConfig {
  endpoint: string;          // Strapi endpoint name
  category: string;          // Display category name (Greek)
  categoryColor: string;     // Tailwind color classes
  fallbackImage: string;     // Default image path
}
```

## Strapi API Integration

### Standard Query Pattern
```typescript
const params = new URLSearchParams();
params.append('filters[isCarousel][$eq]', 'true');
params.append('pagination[page]', '1');
params.append('pagination[pageSize]', '10');
params.append('populate[0]', 'image');
params.append('populate[1]', 'seo');
params.append('populate[2]', 'seo.metaImage');
params.append('populate[3]', 'author');
params.append('populate[4]', 'author.avatar');
params.append('sort', 'createdAt:desc');

const url = `${STRAPI_URL}/api/football-articles?${params}`;
```

### Required Populates
Always populate these relations:
- `image` - Article featured image
- `seo` - SEO metadata
- `seo.metaImage` - SEO image
- `author` - Journalist info
- `author.avatar` - Journalist avatar

### Common Filters
- `isCarousel` - Show in homepage carousel
- `isMainNews` - Featured/main news
- `isHomeSportSection` - Show in sport-specific homepage section

## Styling Guidelines

### Tailwind CSS v4
- **Config**: Custom theme in `frontend/app/globals.css` using `@theme inline`
- **Colors**: Primary red (`#ef4444`), Secondary blue (`#1e40af`)
- **Responsive**: Mobile-first with `md:` (768px), `lg:` (1024px) breakpoints
- **Sport Colors**: Defined in `@/lib/constants.ts`
  - Football: `bg-green-100 text-green-800`
  - Basketball: `bg-orange-100 text-orange-800`
  - Formula 1: `bg-red-100 text-red-800`
  - News: `bg-blue-100 text-blue-800`

### Custom Animations (in globals.css)
- `.breaking-news` - Scrolling ticker (30s loop)
- `.animate-fadeIn` - Hero section fade-in (0.2s)
- `.animate-dropdownFadeIn` - Dropdown menus (0.15s)
- `.animate-slideDown` - Mobile menu (0.3s)
- `.card-hover` - Card lift on hover

### Typography
- **Font**: Geist Sans/Mono via Next.js font optimization
- **Prose**: Custom `.prose` classes for article content (supports Greek text)
- **Logo**: `.logo-text` with text-shadow effect

## Image Handling

### Next.js Image Configuration
Remote patterns configured in `next.config.ts`:
- `http://localhost:1337/uploads/**` (local dev)
- `https://*.strapiapp.com/**` (production Strapi)
- `https://*.media.strapiapp.com/**` (Strapi CDN)

### Best Practices
```typescript
import Image from 'next/image';

// Use fill prop for responsive containers
<Image
  src={imageUrl}
  alt={title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Always use getImageUrl() helper
import { getImageUrl } from '@/lib/sports-api';
const imageUrl = getImageUrl(article.image?.url, '/football.png');
```

## Testing

### Jest + React Testing Library
```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# Single file
npm test -- app/football/__tests__/FootballCard.test.tsx

# Coverage
npm test:coverage
```

### Testing Patterns
- **Location**: `__tests__/` folders or `.test.tsx` adjacent to components
- **Mock Data**: Create typed objects matching interfaces
- **Queries**: Use semantic queries (`getByRole`, `getByText`, `getByAltText`)
- **Greek Text**: Test Greek language support in all components
- **Coverage**: Test rendering, interactions, edge cases, null/undefined handling

## Environment Variables

### Frontend (`frontend/.env.local`)
```bash
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Backend (`backend/sportsholics-cms/.env`)
```bash
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite                    # Use 'postgres' for production
DATABASE_URL=                            # PostgreSQL connection string (prod)
APP_KEYS=                                # Comma-separated secret keys
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=
```

## Database Configuration

### Development (SQLite)
- **File**: `backend/sportsholics-cms/.tmp/data.db`
- **Auto-created**: No setup needed
- **Config**: `DATABASE_CLIENT=sqlite` in `.env`

### Production (PostgreSQL)
- **Config**: `DATABASE_CLIENT=postgres` in `.env`
- **Connection**: Set `DATABASE_URL` or individual `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- **SSL**: Configure via `DATABASE_SSL=true` and related SSL env vars

## Data Seeding

### Setup
1. Create Strapi API token: `Settings → API Tokens → Create new API Token` (Full Access)
2. Save token to `backend/sportsholics-cms/scripts/strapi.token`
3. Run: `node backend/sportsholics-cms/scripts/seed-all-data.js`
4. Publish articles in Strapi admin (select all → publish)

### What Gets Created
- 15 Football Articles
- 15 Basketball Articles
- 15 Formula 1 Articles
- 15 News Articles
- 3 Journalists
- 9 Blog Articles

## Common Pitfalls & Solutions

### 1. Server vs Client Components
- **Problem**: Using hooks (`useState`, `useEffect`) in Server Components
- **Solution**: Mark with `"use client"` directive only when needed

### 2. Image Domains
- **Problem**: Images not loading from Strapi
- **Solution**: Add domain to `remotePatterns` in `next.config.ts`

### 3. API URL Trailing Slashes
- **Problem**: Double slashes in API URLs (`/api//football-articles`)
- **Solution**: `sports-api.ts` automatically strips trailing slashes from `STRAPI_URL`

### 4. Greek Locale
- **Problem**: Forgetting site is Greek language
- **Solution**: Root layout has `<html lang="el">` - respect internationalization

### 5. Author Data
- **Problem**: Null author causing crashes
- **Solution**: Always fallback to `"Sports Holics"` when `article.author` is null

### 6. ESLint in CI/CD
- **Problem**: Build fails on ESLint errors
- **Solution**: `next.config.ts` has `ignoreDuringBuilds: true` (fix issues locally before committing)

### 7. Async in Client Components
- **Problem**: Using `async`/`await` in Client Components
- **Solution**: Move data fetching to Server Components or use `useEffect` with state

## Import Alias

Use `@/` for all imports from `frontend/`:
```typescript
import { fetchSportArticles } from '@/lib/sports-api';
import Header from '@/components/Header';
import { FootballArticle } from '@/app/football/types';
```

## Code Style

- **Components**: PascalCase (`FootballCard.tsx`)
- **Functions/Variables**: camelCase (`fetchArticles`, `imageUrl`)
- **Files**: Match component name or purpose (`page.tsx`, `api.ts`, `types.ts`)
- **Async/Await**: Prefer over `.then()` chains
- **Error Handling**: Try-catch with graceful fallbacks, log warnings with `console.warn()`
- **Comments**: Explain "why" not "what", use JSDoc for public functions

## Git Workflow

**Current branch**: `feature/add-new-text-editor-and-seo-plugins`
**Main branch**: `main`

### Typical workflow
```bash
git add .
git commit -m "Description"
git push origin feature/add-new-text-editor-and-seo-plugins
# Create PR to main when ready
```
