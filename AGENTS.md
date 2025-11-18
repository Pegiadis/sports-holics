# Agent Guidelines for Sports-Holics

## Project Structure

- **frontend/**: Next.js 15 App Router (TypeScript, Tailwind CSS v4, Jest)
- **backend/sportsholics-cms/**: Strapi v5 CMS (SQLite dev, PostgreSQL prod)
- **landing-page/**: Vite + React standalone landing page

## Commands

**Frontend:**

- Dev: `cd frontend && npm run dev` (<http://localhost:3000>)
- Build: `cd frontend && npm run build`
- Lint: `cd frontend && npm run lint`
- Test: `cd frontend && npm test`
- Single test: `cd frontend && npm test -- app/football/__tests__/FootballCard.test.tsx`
- Watch mode: `cd frontend && npm test:watch`

**Backend:**

- Dev: `cd backend/sportsholics-cms && npm run dev` (<http://localhost:1337>)
- Build: `cd backend/sportsholics-cms && npm run build`

## Architecture

- **Pattern**: Next.js App Router with Server Components, Strapi headless CMS
- **Data**: REST API from Strapi (`NEXT_PUBLIC_STRAPI_API_URL`)
- **Caching**: `cache: 'no-store'` for real-time updates, 5s fetch timeout
- **Images**: Next.js Image component with Strapi remote patterns configured

## TypeScript Standards

- **Strict mode**: All function params/returns explicitly typed
- **Interfaces**: Define for all component props and data structures
- **No implicit any**: Avoid `any`, use proper types or `unknown`
- **Generics**: Used in shared utilities (e.g., `fetchSportArticles<T>()`)

## Code Style

- **Imports**: Use `@/` alias (`@/lib/utils`, `@/components/Header`)
- **Components**: Functional with TypeScript interfaces, Server by default
- **Client Components**: Mark with `"use client"` directive only when needed
- **Naming**: PascalCase (components/types), camelCase (functions/variables)
- **Error Handling**: Try-catch with graceful fallbacks, never throw in UI layer
- **Async**: Prefer async/await in Server Components and API functions

## File Organization

- **Pages**: `app/[route]/page.tsx` - Server Components with async data fetching
- **APIs**: `app/[route]/api.ts` - Colocated with pages, uses `@/lib/sports-api.ts`
- **Components**: `components/` (shared) or local to route directories
- **Types**: `types.ts` files colocated with features
- **Tests**: `__tests__/` folders or `.test.tsx` adjacent to components
- **Utils**: `lib/` for shared helpers (sports-api, constants, etc.)

## Strapi CMS Integration

- **Endpoints**: `football-articles`, `basketball-articles`, `formula1-articles`, `news-articles`
- **Populate**: Always include `image`, `seo`, `seo.metaImage`, `author`, `author.avatar`
- **Filters**: Use Strapi syntax: `filters[fieldName][$eq]=value`
- **Pagination**: `pagination[page]=1&pagination[pageSize]=10`
- **Sorting**: `sort=createdAt:desc` for newest articles first

## Data Fetching Patterns

- Use generic `fetchSportArticles()` from `@/lib/sports-api.ts`
- All API calls use `cache: 'no-store'` for real-time CMS updates
- 5-second timeout on all fetch requests via `AbortSignal.timeout(5000)`
- Graceful error handling - return empty arrays/fallback data, never throw
- Transform Strapi responses using `transformArticle()` helper

## Styling

- **Framework**: Tailwind CSS v4 (utility-first)
- **Responsive**: Mobile-first with `md:`, `lg:` breakpoints
- **Colors**: Primary red theme, category colors in `@/lib/constants.ts`
- **Typography**: Geist Sans/Mono fonts via Next.js optimization
- **Animations**: Always add `transition-*` classes for hover states

## Testing Best Practices

- **Framework**: Jest + React Testing Library
- **Location**: `__tests__/` or `.test.tsx` files
- **Mock Data**: Create typed mock objects matching interfaces
- **Queries**: Use semantic queries (`getByText`, `getByRole`, `getByAltText`)
- **Coverage**: Component rendering, user interactions, edge cases, Greek text support

## Environment Variables

- **Frontend**: `NEXT_PUBLIC_STRAPI_API_URL` (defaults to <http://localhost:1337>)
- **Backend**: Uses `.env` for `DATABASE_CLIENT`, `DATABASE_URL`, etc.
- **Never commit**: `.env` files (only `.env.example`)

## Common Pitfalls

- Images need `remotePatterns` config in `next.config.ts` for Strapi domains
- Site locale is Greek (`lang="el"`) - respect internationalization
- Don't use React hooks (useState, useEffect) in Server Components
- Don't use async/await directly in Client Components
- ESLint disabled during builds - fix issues locally before committing
- Always handle missing/null author data (fallback to "Sports Holics")
- Remove trailing slashes from API URLs to prevent double slashes

## Image Handling

- Use Next.js `<Image>` component with `fill` prop for responsive layouts
- Remote patterns configured for `*.strapiapp.com` and `localhost:1337`
- Always provide fallback images (e.g., `/football.png`, `/basketball.png`)
- Use `getImageUrl()` helper from sports-api.ts to handle relative/absolute paths

## API URL Structure

- **Strapi Base**: `${STRAPI_URL}/api/[endpoint-name]`
- **Frontend Dev**: <http://localhost:3000>
- **Strapi Dev**: <http://localhost:1337>
- **Strapi Admin**: <http://localhost:1337/admin>
