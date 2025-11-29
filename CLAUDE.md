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

# YouTube video embedding
node scripts/add-video-to-article.js  # Helper to add videos to articles
node scripts/test-video-embedding.js  # Create test article with videos
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

## Video Embedding (YouTube)

### Overview
Sports-Holics supports YouTube video embedding in article content using custom video blocks in the Strapi Blocks editor.

### Features
- **Responsive 16:9 embeds** - Videos maintain aspect ratio on all devices
- **Lazy loading** - Videos load when user scrolls to them (performance optimization)
- **Privacy-enhanced** - Uses `youtube-nocookie.com` domain
- **Multiple videos per article** - Add as many videos as needed inline with content
- **Supported URL formats** - All YouTube URL types (youtube.com/watch, youtu.be, embed URLs)

### Frontend Implementation
Video blocks are automatically rendered by `richtext-utils.ts`:
```typescript
// Video block structure
{
  type: 'video',
  provider: 'youtube',
  url: 'https://www.youtube.com/watch?v=VIDEO_ID',
  videoId: 'VIDEO_ID'
}
```

### For Editors: Adding Videos to Articles

**Method 1: JSON Editor (Recommended)**
1. Open article in Strapi admin
2. Switch to JSON view in Blocks editor
3. Add video block anywhere in the blocks array:
```json
{
  "type": "video",
  "provider": "youtube",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "videoId": "dQw4w9WgXcQ"
}
```
4. Save and publish

**Method 2: Helper Script**
```bash
cd backend/sportsholics-cms
node scripts/add-video-to-article.js
# Follow prompts to add video to existing article
```

**Method 3: Test Article**
```bash
cd backend/sportsholics-cms
node scripts/test-video-embedding.js
# Creates test article with multiple video examples
```

### Supported YouTube URL Formats
All these work:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

### Documentation
See `backend/sportsholics-cms/VIDEO_EMBEDDING_GUIDE.md` for complete editor guide.

## Social Media Embedding

### Overview
Sports-Holics supports embedding social media posts from Twitter/X, Facebook, TikTok, and Instagram in article content using Dynamic Zone components.

### Features
- **Multiple platforms** - Twitter/X, Facebook, TikTok, Instagram
- **Interactive embeds** - Readers can like, share, and interact with embedded content
- **Responsive design** - Platform-specific max widths that adapt to mobile
- **Secure rendering** - Three-layer security with DOMPurify sanitization and domain whitelisting
- **Optional captions** - Add context to each embed

### Backend Structure
Social media embeds use a Dynamic Zone component defined at:
- `backend/sportsholics-cms/src/components/article/social-media-embed.json`

Component fields:
- `platform`: Enumeration (twitter, facebook, tiktok, instagram)
- `embedCode`: Text field storing raw HTML from platform
- `caption`: Optional string for context

All article content types include this component in their Dynamic Zone:
```json
"content": {
  "type": "dynamiczone",
  "components": [
    "article.text-block",
    "article.video-embed",
    "article.image-embed",
    "article.social-media-embed"
  ]
}
```

### Frontend Implementation

**Sanitization** (`frontend/lib/richtext-utils.ts`):
```typescript
// Uses isomorphic-dompurify for XSS prevention
function sanitizeEmbedCode(embedCode: string, platform: string): string {
  // Whitelist tags: iframe, blockquote, script
  // Whitelist platform-specific domains
  // Returns empty string if validation fails
}
```

**Rendering**:
```typescript
function renderSocialMediaEmbed(component: SocialMediaEmbedComponent): string {
  // Sanitizes embed code
  // Wraps in responsive container with platform-specific class
  // Returns HTML for dangerouslySetInnerHTML
}
```

**Client-side Scripts** (`frontend/components/SocialMediaScripts.tsx`):
- Loads platform SDKs (Twitter widgets.js, Instagram embed.js, TikTok embed.js)
- Transforms static blockquotes into interactive embeds
- Included in article page template

### Security Features

**Three-layer security approach**:

1. **DOMPurify Sanitization** - Whitelist-based HTML sanitization
   - Only allows: `iframe`, `blockquote`, `script` tags
   - Filters attributes to necessary ones only

2. **Domain Whitelisting** - Platform-specific allowed domains:
   - Twitter: `twitter.com`, `x.com`, `platform.twitter.com`
   - Facebook: `facebook.com`, `fb.com`, `connect.facebook.net`
   - TikTok: `tiktok.com`
   - Instagram: `instagram.com`, `platform.instagram.com`

3. **Server-Side Rendering** - Sanitization happens in Server Components before HTML reaches client

### Responsive Design

Platform-specific max widths (CSS in `frontend/app/globals.css`):
- Twitter/X: 550px
- Facebook: 500px
- Instagram: 540px
- TikTok: 605px
- Mobile: 100% width on screens < 768px

### For Editors: Adding Social Media Embeds

**Step 1: Get Embed Code**

**Twitter/X**:
1. Go to tweet → Click share icon (⋯) → "Embed Tweet"
2. Copy entire HTML code (includes `<blockquote>` and `<script>`)

**Facebook**:
1. Go to post → Click three dots (...) → "Embed"
2. Copy entire HTML code

**TikTok**:
1. Go to video → Click share icon → "Embed"
2. Copy entire HTML code

**Instagram**:
1. Go to post → Click three dots (...) → "Embed"
2. Copy entire HTML code

**Step 2: Add to Article in Strapi**

1. Open article in Strapi admin
2. In Content section (Dynamic Zone), click "Add a component"
3. Select "Social Media Embed"
4. Select platform from dropdown
5. Paste embed code in "Embed Code" field
6. (Optional) Add caption
7. Save and publish

### Helper Scripts

**Add embed to existing article**:
```bash
cd backend/sportsholics-cms
node scripts/add-social-embed-to-article.js
# Interactive CLI tool with platform-specific instructions
```

**Create test article with all platforms**:
```bash
cd backend/sportsholics-cms
node scripts/test-social-embeds.js
# Creates test article with Twitter, Facebook, TikTok, Instagram embeds
```

### Supported Embed Code Formats

**Twitter/X**:
```html
<blockquote class="twitter-tweet">...</blockquote>
<script async src="https://platform.twitter.com/widgets.js"></script>
```

**Facebook**:
```html
<iframe src="https://www.facebook.com/plugins/post.php?href=..."></iframe>
```

**TikTok**:
```html
<blockquote class="tiktok-embed" cite="..." data-video-id="...">...</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>
```

**Instagram**:
```html
<blockquote class="instagram-media" data-instgrm-permalink="...">...</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

### Best Practices

- **Limit embeds**: 1-3 per article to avoid performance issues
- **Add captions**: Provide context for each embed
- **Test before publishing**: Verify embeds load correctly
- **Mix with text**: Don't place embeds back-to-back
- **Check permissions**: Only embed public posts

### Troubleshooting

**Embed doesn't appear**:
- Article must be published (not draft)
- Embed code must be complete (including `<script>` tags)
- Post must be public

**Embed gets rejected**:
- Must use official embed code from platform
- Wrong platform selected in dropdown
- Post contains untrusted URLs

**Embed looks broken**:
- Wait for platform SDK to load
- Check browser console for errors
- Try refreshing the page

### Documentation
See `backend/sportsholics-cms/SOCIAL_MEDIA_EMBEDDING_GUIDE.md` for complete editor guide with screenshots and detailed platform instructions.

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
