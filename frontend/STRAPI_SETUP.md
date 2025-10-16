# Strapi CMS Integration Setup Guide

This guide explains how to set up and use the Strapi CMS integration for the Sports Holics frontend.

## Prerequisites

1. Strapi backend should be running (default: `http://localhost:1337`)
2. Node.js and npm installed

## Environment Setup

Create a `.env.local` file in the `frontend` directory with the following content:

```env
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

### Environment Variables Explained

- `NEXT_PUBLIC_STRAPI_API_URL`: The URL where your Strapi backend is running
- `NEXT_PUBLIC_STRAPI_API_TOKEN`: Optional API token for authenticated requests (leave empty for public access)

## Strapi Backend Setup

### 1. Start the Strapi Backend

```bash
cd backend/sportsholics-cms
npm run develop
```

The Strapi admin panel should now be accessible at `http://localhost:1337/admin`

### 2. Create Content in Strapi

1. **Access the Admin Panel**: Open `http://localhost:1337/admin` in your browser
2. **Navigate to Articles**: Go to Content Manager → Articles
3. **Create New Articles**: Click "Create new entry"

### 3. Article Fields

When creating articles in Strapi, fill in the following fields:

- **Title** (required): The article headline
- **Description** (required): A brief summary or full article text
- **Category** (required): Category name (e.g., "ΜΠΑΣΚΕΤ", "ΠΟΔΟΣΦΑΙΡΟ", "FORMULA 1")
- **Author** (required): Author's name
- **Image**: Upload an image for the article
- **isCarousel** (boolean): Set to `true` for articles to appear in the carousel
- **isFeatured** (boolean): Set to `true` for featured articles
- **Slug**: Auto-generated URL-friendly version of the title

### 4. Enable Public Access

To allow the frontend to fetch articles without authentication:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Expand **Article** permissions
3. Check the following permissions:
   - `find` (to list articles)
   - `findOne` (to get a single article)
4. Click **Save**

## How It Works

### Carousel Integration

The home page now fetches carousel articles from Strapi:

1. **Server-Side Fetch**: The page.tsx component fetches articles on the server
2. **Filtering**: Only articles with `isCarousel: true` are fetched
3. **Fallback**: If Strapi is unavailable, the app falls back to mock data
4. **Transform**: Strapi articles are transformed to match the frontend `NewsArticle` type

### API Service

The integration includes a comprehensive API service (`frontend/lib/api.ts`):

- `fetchArticles()`: Fetch multiple articles with filters
- `fetchArticleById()`: Fetch a single article by ID
- `fetchArticleBySlug()`: Fetch a single article by slug
- `getStrapiImageUrl()`: Helper to get full image URLs

### Data Transformation

The `transformers.ts` file handles converting Strapi's API response format to the frontend's `NewsArticle` type:

- Maps Strapi attributes to frontend properties
- Calculates "time ago" from timestamps
- Assigns category colors
- Handles image URLs

## Testing the Integration

1. **Start Strapi**:
   ```bash
   cd backend/sportsholics-cms
   npm run develop
   ```

2. **Create some carousel articles** in the Strapi admin panel:
   - Set `isCarousel` to `true`
   - Add title, description, category, author, and an image
   - Click **Publish**

3. **Start the Next.js frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

4. **View the carousel**: Open `http://localhost:3000` and check the "Σημαντικά Νέα" (Hot News) section

## Troubleshooting

### Articles not showing up

1. **Check Strapi is running**: Visit `http://localhost:1337/admin`
2. **Verify articles are published**: Unpublished articles won't appear
3. **Check `isCarousel` flag**: Only articles with `isCarousel: true` appear in the carousel
4. **Check console**: Open browser DevTools to see any error messages
5. **Verify permissions**: Ensure Public role has `find` and `findOne` permissions for articles

### CORS issues

If you see CORS errors in the browser console:

1. Open `backend/sportsholics-cms/config/middlewares.ts`
2. Add CORS configuration to allow your frontend domain

### Images not loading

1. **Check image upload**: Ensure images are uploaded in Strapi
2. **Verify URLs**: Images should be accessible at `http://localhost:1337/uploads/...`
3. **Check permissions**: Ensure the uploads folder is publicly accessible

## API Examples

### Fetch carousel articles

```typescript
import { fetchArticles } from "@/lib/api";

const response = await fetchArticles({ 
  isCarousel: true, 
  limit: 6 
});
```

### Fetch featured articles

```typescript
const response = await fetchArticles({ 
  isFeatured: true, 
  limit: 10 
});
```

### Fetch article by slug

```typescript
import { fetchArticleBySlug } from "@/lib/api";

const response = await fetchArticleBySlug("article-title-slug");
```

## Category Colors

The following category colors are predefined in `frontend/lib/constants.ts`:

- ΜΠΑΣΚΕΤ / BASKETBALL: Orange
- ΠΟΔΟΣΦΑΙΡΟ / FOOTBALL: Green
- FORMULA 1: Blue
- And more...

You can add more categories by updating the `CATEGORY_COLORS` object.

## Next Steps

Now that the carousel integration is complete, you can extend it to:

1. **Main News Section**: Fetch main news articles from Strapi
2. **Football Section**: Fetch football-specific articles
3. **Basketball Section**: Fetch basketball-specific articles
4. **Formula 1 Section**: Fetch F1-specific articles
5. **Create Article Pages**: Add individual article detail pages
6. **Add Search**: Implement article search functionality
7. **Add Pagination**: Implement pagination for large article lists

## Files Created/Modified

### Backend Files Created

- `backend/sportsholics-cms/src/api/article/content-types/article/schema.json`
- `backend/sportsholics-cms/src/api/article/controllers/article.ts`
- `backend/sportsholics-cms/src/api/article/services/article.ts`
- `backend/sportsholics-cms/src/api/article/routes/article.ts`

### Frontend Files Created

- `frontend/lib/api.ts`: Strapi API service
- `frontend/lib/transformers.ts`: Data transformation utilities
- `frontend/STRAPI_SETUP.md`: This file

### Frontend Files Modified

- `frontend/app/page.tsx`: Updated to fetch from Strapi
- `frontend/components/NewsCarousel.tsx`: Updated to accept props

## Support

If you encounter issues:

1. Check the browser console for errors
2. Check the Strapi terminal for backend errors
3. Verify all environment variables are set correctly
4. Ensure Strapi is running and accessible

