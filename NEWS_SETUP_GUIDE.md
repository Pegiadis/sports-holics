# News Section Setup Guide

## ✅ What's Been Created

### Backend (Strapi)
✅ **News Article Collection Type**
- Location: `backend/sportsholics-cms/src/api/news-article/`
- API Endpoint: `/api/news-articles`
- Same structure as Football, Basketball, Formula1 articles

### Frontend (Next.js)
✅ **API Functions**: `frontend/app/news/api.ts`
- `fetchNewsArticles()` - Get all news articles

✅ **Pages Created**:
- `/news` - News index page with all articles
- Uses `NewsCard` component for display

✅ **Homepage Section**:
- News section appears after Journalists section
- Shows up to 9 articles in grid layout
- Follows same pattern as Football/Basketball/Formula1 sections

---

## 🚀 How to Use

### Step 1: Restart Strapi

The new collection type needs Strapi to restart:

```bash
cd backend/sportsholics-cms
npm run develop
```

### Step 2: Enable Public Permissions

1. Go to: `http://localhost:1337/admin`
2. Settings → Users & Permissions → Public
3. Scroll to **News-article**
4. Enable:
   - ✅ `find`
   - ✅ `findOne`
5. Click **Save**

### Step 3: Create Your First News Article

1. Go to **Content Manager → News Article → Create new entry**

2. **Fill in the fields**:
   - **Title** ✅ Required: "Breaking: Important News Update"
   - **Subtitle**: "Latest developments in the news"
   - **Description** ✅ Required: Your full article content (rich text)
   - **Author** ✅ Required: "Sports Holics" (default)
   - **Image**: Upload a featured image
   - **Slug** ✅ Auto-generated: `breaking-important-news-update`
   - **Is Carousel**: ❌ (optional, for carousel display)
   - **Is Main News**: ❌ (optional, for main news section)
   - **Is Home Sport Section**: ✅ (to show on homepage)

3. Click **Save & Publish** ✅

### Step 4: View Your News

**Homepage Section:**
- Navigate to: `http://localhost:3000`
- Scroll down past the Journalists section
- You'll see the News section with your article

**News Page:**
- Navigate to: `http://localhost:3000/news`
- All published news articles will appear here

**Single Article:**
- Click on any news article
- Goes to: `http://localhost:3000/article/[slug]`
- Uses the same article page as sports articles

---

## 📊 Article Flags

| Flag | Purpose | Where it Appears |
|------|---------|------------------|
| **Is Home Sport Section** | Show on homepage | Homepage "Ειδήσεις" section |
| **Is Main News** | Main news section | Not used for News |
| **Is Carousel** | Carousel display | Not used for News |

For News articles, just check **"Is Home Sport Section"** to show them on the homepage.

---

## 🎨 Features

### News Index Page (`/news`)
- **Page Title**: "Ειδήσεις" with 📰 icon
- **Grid Layout**: Sidebar + main content
- **Card Design**: Same as Football/Basketball pages
- **Responsive**: Works on mobile, tablet, desktop

### Homepage Section
- **Location**: After Journalists, before Football
- **Layout**: 3-column grid
- **Shows up to 9 articles**:
  - First 3: Large cards
  - Next 3: Small cards (if available)
  - Next 3: Small cards (if available)
- **Category Badge**: Purple "NEWS" badge
- **Section Dividers**: Sporty dividers before and after

---

## 🔧 Best Practices

### Title
- Keep it concise and clear
- Under 80 characters
- Example: "Breaking: Major Announcement Today"

### Slug
- Auto-generated from title
- Can be customized
- Use lowercase, hyphens only
- Example: `major-announcement-today`

### Description
- Full article content
- Supports rich text/markdown
- Can include images, formatting

### Image
- **Recommended size**: 1200x800px
- Use high-quality images
- Compress before uploading

### Homepage Display
- Set **"Is Home Sport Section" = ✅**
- Create at least 3 articles for best display
- Newer articles appear first

---

## 🐛 Troubleshooting

### "Δεν υπάρχουν διαθέσιμα άρθρα" on `/news`
- Make sure articles are **published** (not draft)
- Check Strapi permissions are enabled
- Verify Strapi is running

### News section not showing on homepage
- Check that "Is Home Sport Section" is ✅ for articles
- Make sure articles are published
- Try hard refresh: `Ctrl+Shift+R`

### 403 Forbidden error
- Enable Public permissions in Strapi
- Make sure both `find` and `findOne` are checked

### Images not showing
- Check image is uploaded in Strapi
- Verify Strapi is running
- Image URLs: `http://localhost:1337/uploads/...`

---

## 📝 Collection Type Structure

```json
{
  "title": "string (required)",
  "subtitle": "string (optional)",
  "description": "richtext (required)",
  "author": "string (required, default: Sports Holics)",
  "image": "media (optional)",
  "slug": "uid (auto-generated)",
  "isCarousel": "boolean (default: false)",
  "isMainNews": "boolean (default: false)",
  "isHomeSportSection": "boolean (default: false)"
}
```

---

## 🎯 Quick Test

Create a test article to verify everything works:

**In Strapi:**
1. Content Manager → News Article → Create
2. Title: "Test News Article"
3. Description: "This is a test article for the news section."
4. Is Home Sport Section: ✅
5. Save & Publish

**View on Frontend:**
- Homepage: `http://localhost:3000` (scroll to News section)
- News page: `http://localhost:3000/news`
- Single article: `http://localhost:3000/article/test-news-article`

---

## 🆚 How News Differs from Other Sections

| Feature | Sports Articles | Blog | News |
|---------|----------------|------|------|
| **Purpose** | Sports-specific news | Journalist posts | General news |
| **Collection** | Football/Basketball/F1 | Blog Articles | News Articles |
| **URL** | `/article/[slug]` | `/blog/[journalist]/[article]` | `/article/[slug]` |
| **Homepage** | Separate sections | Not on homepage | Single section |
| **Navigation** | Dropdown menu | Blog link | "Ειδήσεις" link |
| **Badge Color** | Sport-specific | Varies | Purple |

---

Happy publishing! 📰✨

**No caching** is enabled, so all changes appear **instantly**! 🚀

