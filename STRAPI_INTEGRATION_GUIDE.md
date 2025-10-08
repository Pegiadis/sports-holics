# 🏆 Sports News Website - Strapi Integration Guide

## Overview

This guide will walk you through setting up Strapi with images, categories, and all fields needed for the sports news homepage.

---

## 📋 Step 1: Update Article Content Type

You need to update your existing **Article** content type in Strapi to include all necessary fields.

### 1.1 Access Content-Type Builder

1. Open Strapi admin panel: `http://localhost:1337/admin`
2. Click **Content-Type Builder** (left sidebar)
3. Click on **Article** to edit it

### 1.2 Add New Fields

Click **"Add another field"** for each of these:

#### **Field 1: Image (Media)**
- Type: **Media**
- Name: `image`
- Type: **Single media**
- Allowed types: **Images only**
- Click **"Finish"**

#### **Field 2: Excerpt (Text)**
- Type: **Text**
- Name: `excerpt`
- Type: **Short text**
- Click **"Add another field"**

#### **Field 3: Category (Text)**
- Type: **Text**
- Name: `category`
- Type: **Short text**
- Click **"Add another field"**

#### **Field 4: Featured (Boolean)**
- Type: **Boolean**
- Name: `featured`
- Default value: **false**
- Click **"Finish"**

### 1.3 Save Content Type

1. Click **"Save"** (top right)
2. Wait for Strapi server to restart (30-60 seconds)

---

## 🔓 Step 2: Update Permissions

### 2.1 Enable Media Upload Permission

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **"Public"** role
3. Scroll to **Upload** section
4. Check these boxes:
   - ✅ `find`
   - ✅ `findOne`
5. Make sure **Article** section has:
   - ✅ `find`
   - ✅ `findOne`
6. Click **"Save"**

---

## 📝 Step 3: Add Sample Articles with Images

### 3.1 Create Articles with All Fields

1. Go to **Content Manager** → **Article**
2. Click **"Create new entry"**

#### Sample Article 1 (Featured):
- **Title**: "Team Wins Championship After Dramatic Final"
- **Excerpt**: "In an incredible display of skill and determination, the team secured victory in the final minutes of the match."
- **Content**: "The championship game was filled with excitement from start to finish. In a nail-biting conclusion, our team managed to score the winning goal in the 89th minute..."
- **Category**: "CHAMPIONSHIP"
- **Author**: "John Sports"
- **Featured**: ✅ **true** (check the box)
- **Image**: Upload a sports image (or use placeholder for now)

#### Sample Article 2:
- **Title**: "Star Player Signs New Contract Extension"
- **Excerpt**: "The club announces a major contract renewal with their star player, securing his future for the next five years."
- **Content**: "In a move that delighted fans, the club confirmed today that..."
- **Category**: "TRANSFERS"
- **Author**: "Sarah Johnson"
- **Featured**: ❌ false
- **Image**: Upload an image

#### Sample Article 3:
- **Title**: "Coach Discusses Team Strategy for Upcoming Season"
- **Excerpt**: "In a press conference, the head coach outlined his vision and plans for the team's success."
- **Content**: "The coach emphasized the importance of teamwork and preparation..."
- **Category**: "INTERVIEWS"
- **Author**: "Mike Reporter"
- **Featured**: ❌ false
- **Image**: Upload an image

### 3.2 Publish Articles

⚠️ **IMPORTANT**: After creating each article:
1. Click **"Save"**
2. Click **"Publish"** (top right)

Create at least **6-8 articles** to see the full layout.

---

## 🎨 Step 4: Image Recommendations

### Image Specifications:
- **Format**: JPG, PNG, or WebP
- **Recommended size**: 1200x675px (16:9 ratio)
- **Max file size**: 2MB

### Where to Get Free Sports Images:
- [Unsplash](https://unsplash.com/s/photos/sports) - Free high-quality images
- [Pexels](https://www.pexels.com/search/sports/) - Free stock photos
- [Pixabay](https://pixabay.com/images/search/football/) - Free images

### Upload Process:
1. In article edit page, click **"Add new assets"** under Image field
2. Drag & drop image or click to browse
3. Wait for upload to complete
4. Image thumbnail will appear
5. Save and publish

---

## 🔧 Step 5: Configure CORS (Already Done)

Your `middlewares.ts` should already have CORS configured. Verify it looks like this:

```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    headers: ['Content-Type', 'Authorization', 'X-Frame-Options'],
  },
}
```

---

## 🚀 Step 6: Run Both Applications

### Terminal 1 - Strapi Backend:
```bash
cd sportsholics-backend
npm run develop
```
**Runs at**: `http://localhost:1337`

### Terminal 2 - React Frontend:
```bash
cd sportsholics-website  
npm run dev
```
**Runs at**: `http://localhost:5173`

---

## ✅ Step 7: Verify Integration

### Check API Endpoint:
Open in browser: `http://localhost:1337/api/articles?populate=*`

You should see JSON with:
```json
{
  "data": [
    {
      "id": 1,
      "title": "...",
      "excerpt": "...",
      "content": [...],
      "category": "...",
      "author": "...",
      "featured": true,
      "image": {
        "url": "/uploads/...",
        "formats": { ... }
      },
      ...
    }
  ]
}
```

### Check React App:
1. Open `http://localhost:5173`
2. You should see:
   - Dark themed sports news layout
   - Featured article (large) on the left
   - 3 sidebar articles on the right
   - Grid of articles below
   - All images loading properly
   - Categories displayed as badges

---

## 🎯 Article Content Type Summary

Your final **Article** content type should have these fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | Text (Short) | Yes | Article headline |
| excerpt | Text (Short) | Yes | Brief summary (1-2 sentences) |
| content | Rich Text | Yes | Full article content |
| category | Text (Short) | Yes | Category badge (e.g., "CHAMPIONSHIP") |
| author | Text (Short) | Yes | Author name |
| featured | Boolean | No | Mark as featured article (shows in hero) |
| image | Media (Single) | No | Article image (1200x675px recommended) |

---

## 🐛 Troubleshooting

### Images Not Showing
**Problem**: Images show broken or placeholder  
**Solutions**:
- Make sure you uploaded images in Strapi
- Check public permissions include Upload `find` and `findOne`
- Verify image URL in browser: `http://localhost:1337/uploads/...`
- Make sure articles are published, not just saved

### Featured Article Not Showing
**Problem**: Wrong article appears as hero  
**Solution**:
- Set `featured: true` on one article
- Or the newest article will be featured by default

### Categories Not Displaying
**Problem**: No category badges  
**Solution**:
- Make sure to fill in the `category` field
- Use UPPERCASE for consistency (e.g., "CHAMPIONSHIP", "TRANSFERS")

### CORS Errors
**Problem**: Network errors in console  
**Solution**:
- Update `middlewares.ts` as shown in Step 5
- Restart Strapi server

---

## 🎨 Customization Tips

### Change Category Colors:
Edit `HomePage.css`:
```css
.category-badge {
  background: var(--accent-blue); /* Change color here */
}
```

### Add More Categories:
Create articles with different categories:
- "LIVE SCORES"
- "TRANSFERS"  
- "INTERVIEWS"
- "MATCH ANALYSIS"
- "TEAM NEWS"

### Adjust Layout:
In `HomePage.tsx`, modify:
- `sideArticles.slice(0, 3)` - Change number of sidebar articles
- `gridArticles.slice(3, 9)` - Change number of grid articles

---

## 📊 Sample Data Structure

### Example Article JSON:
```json
{
  "title": "Team Wins Championship",
  "excerpt": "Historic victory in final match",
  "content": [{
    "type": "paragraph",
    "children": [{ "type": "text", "text": "Full article content..." }]
  }],
  "category": "CHAMPIONSHIP",
  "author": "John Sports",
  "featured": true,
  "image": {
    "url": "/uploads/sports_image.jpg",
    "formats": {
      "thumbnail": { "url": "/uploads/thumbnail_sports_image.jpg" },
      "medium": { "url": "/uploads/medium_sports_image.jpg" },
      "large": { "url": "/uploads/large_sports_image.jpg" }
    }
  }
}
```

---

## 🔄 Quick Testing Workflow

1. **Add Article in Strapi**:
   - Fill all fields
   - Upload image
   - Save → Publish

2. **Refresh React App**:
   - Open `http://localhost:5173`
   - Press F5 or Ctrl+R
   - New article appears!

3. **Edit Article**:
   - Make changes in Strapi
   - Save → Publish
   - Refresh React app

---

## 🎓 Next Steps

Once your sports news site is working:

### Add More Features:
- [ ] Search functionality
- [ ] Filter by category
- [ ] Pagination
- [ ] Single article page
- [ ] Related articles
- [ ] Social sharing
- [ ] Comments section

### Enhance Content:
- [ ] Add video content
- [ ] Multiple images per article
- [ ] Tags system
- [ ] Author profiles
- [ ] Article ratings

### Deploy:
- [ ] Deploy Strapi (Heroku/Railway/Render)
- [ ] Deploy React (Vercel/Netlify)
- [ ] Set up production API URL
- [ ] Configure media storage (Cloudinary/AWS S3)

---

## 📚 Resources

- [Strapi Media Upload](https://docs.strapi.io/dev-docs/plugins/upload)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Populate](https://docs.strapi.io/dev-docs/api/rest/populate-select)

---

## 🎉 Success Checklist

- [ ] Strapi Article content type has all 7 fields
- [ ] Public permissions enabled for Articles and Upload
- [ ] At least 6 articles created with images
- [ ] At least 1 article marked as featured
- [ ] All articles published (not drafts)
- [ ] Images uploading and displaying correctly
- [ ] React app shows dark sports theme
- [ ] Hero article displays on left
- [ ] Sidebar articles display on right
- [ ] Grid articles display below
- [ ] Category badges showing
- [ ] Dates formatting correctly
- [ ] No console errors

---

**You're all set!** 🚀 You now have a professional sports news website with Strapi CMS!

