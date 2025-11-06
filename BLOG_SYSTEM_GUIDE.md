# Complete Blog System Guide

## 🎯 System Architecture

Your blog system is now **fully integrated** with separate collection types that work together seamlessly.

## 📊 How It Works - The Complete Flow

### Collection Types (Strapi CMS)

```
┌─────────────────┐         ┌──────────────────┐
│   Journalists   │ ──1:N──→│  Blog Articles   │
│                 │         │                  │
│ - Name          │         │ - Title          │
│ - Avatar        │         │ - Content        │
│ - Bio           │         │ - Cover Image    │
│ - Specialty     │         │ - Category       │
│ - Social Links  │         │ - Tags           │
└─────────────────┘         │ - Journalist (FK)│
                            └──────────────────┘
```

**Key Relationship:**
- Each **Journalist** can have **MANY** Blog Articles
- Each **Blog Article** belongs to **ONE** Journalist

This is a **one-to-many relationship**, just like you wanted!

## 🔄 User Journey

### 1. Homepage (`/`)
```
User sees section: "Οι Δημοσιογράφοι μας"
├── Shows top 4 journalists with avatars
├── Click "Δείτε όλους" → goes to /blog
└── Click journalist card → goes to /blog/{journalist-slug}
```

### 2. Blog Page (`/blog`)
```
Shows ALL journalists in a grid
├── Each journalist card shows:
│   ├── Avatar
│   ├── Name
│   ├── Title
│   └── Specialty
└── Click any journalist → goes to /blog/{journalist-slug}
```

### 3. Journalist Page (`/blog/nikos-papadopoulos`)
```
Shows journalist profile + all their articles
├── Profile Section:
│   ├── Large avatar
│   ├── Name, title, bio
│   ├── Social media links
│   └── Article count
├── Articles Grid:
│   └── All articles by this journalist
└── Click article → goes to /blog/{journalist}/{article-slug}
```

### 4. Article Page (`/blog/nikos-papadopoulos/champions-league-analysis`)
```
Full article reading experience
├── Cover image
├── Title & subtitle
├── Author card (links back to journalist)
├── Full article content (rich text with images)
├── Tags
├── Share buttons (Facebook, X, Instagram)
└── "More from this journalist" section
```

## 📁 File Structure

### Backend (Strapi)
```
backend/sportsholics-cms/src/api/
├── journalist/
│   ├── content-types/journalist/schema.json
│   ├── controllers/journalist.ts
│   ├── routes/journalist.ts
│   └── services/journalist.ts
└── blog-article/
    ├── content-types/blog-article/schema.json
    ├── controllers/blog-article.ts
    ├── routes/blog-article.ts
    └── services/blog-article.ts
```

### Frontend (Next.js)
```
frontend/
├── app/
│   ├── homepage-api.ts (journalists fetch)
│   └── blog/
│       ├── page.tsx (all journalists)
│       ├── api.ts (blog-specific fetches)
│       ├── [journalist]/
│       │   ├── page.tsx (journalist profile + articles)
│       │   └── [article]/
│       │       └── page.tsx (full article)
│       └
├── components/
│   └── JournalistsSection.tsx (reusable component)
```

## 🎨 How Content Editors Use It

### Step 1: Create Journalists

1. Go to Strapi: Content Manager → Journalist → Create new entry
2. Fill in:
   - **Name**: "Νίκος Παπαδόπουλος"
   - **Title**: "Αθλητικός Δημοσιογράφος"
   - **Bio**: Brief biography
   - **Avatar**: Upload photo
   - **Specialty**: "Ποδόσφαιρο"
   - **Twitter/Instagram**: Social links
   - **Is Active**: true
   - **Priority**: 10 (higher = shows first)
3. Save & Publish

### Step 2: Create Blog Articles

1. Content Manager → Blog Article → Create new entry
2. Fill in:
   - **Title**: "Ανάλυση Champions League"
   - **Subtitle**: "Οι κορυφαίες στιγμές"
   - **Content**: Write full article (rich text editor)
   - **Excerpt**: Short preview (300 chars max)
   - **Cover Image**: Upload image
   - **Journalist**: SELECT the journalist from dropdown
   - **Category**: Choose from: Ποδόσφαιρο, Μπάσκετ, etc.
   - **Tags**: ["champions-league", "uefa", "football"]
   - **Read Time**: 5 (minutes)
   - **Is Featured**: true (for special articles)
3. Save & Publish

### Step 3: View on Website

- Homepage: Shows top 4 journalists
- `/blog`: Shows all journalists
- `/blog/nikos-papadopoulos`: Shows Nikos + his articles
- `/blog/nikos-papadopoulos/champions-league-analysis`: Full article

## 🔗 The Connection - How Blog Articles Link to Journalists

### In Strapi (Backend)

**Blog Article Schema:**
```json
"journalist": {
  "type": "relation",
  "relation": "manyToOne",
  "target": "api::journalist.journalist"
}
```

This means:
- ✅ Each blog article MUST belong to ONE journalist
- ✅ When creating an article, you SELECT the journalist from dropdown
- ✅ Strapi automatically manages the relationship

**Journalist Schema:**
```json
"blogArticles": {
  "type": "relation",
  "relation": "oneToMany",
  "target": "api::blog-article.blog-article",
  "mappedBy": "journalist"
}
```

This means:
- ✅ Strapi automatically tracks which articles belong to each journalist
- ✅ You can fetch "journalist + all their articles" in one query

### In Frontend (Next.js)

**Fetching Articles by Journalist:**
```typescript
// Filter articles where journalist slug matches
filters[journalist][slug][$eq] = journalistSlug
```

This queries Strapi: "Give me all blog articles where the journalist's slug is X"

## 🚀 Setup Instructions

### 1. Restart Strapi

```bash
cd backend/sportsholics-cms
npm run develop
```

### 2. Set API Permissions

Go to: `http://localhost:1337/admin`

**Settings → Roles → Public**

Enable these permissions:
- ✅ **Journalist**: find, findOne
- ✅ **Blog-article**: find, findOne

Click **Save**

### 3. Add Your First Journalist

Content Manager → Journalist → Create new entry

Example:
```
Name: Γιώργος Αντωνίου
Title: Senior Sports Journalist  
Bio: Με πάνω από 15 χρόνια εμπειρίας στον αθλητικό δημοσιογραφισμό...
Specialty: Ποδόσφαιρο
Twitter: https://twitter.com/gantonios
Instagram: https://instagram.com/gantonios
Is Active: ✅ true
Priority: 10
```

Upload a professional photo for Avatar.

Save & Publish!

### 4. Add Your First Blog Article

Content Manager → Blog Article → Create new entry

Example:
```
Title: Η μεγάλη ανατροπή στο Champions League
Subtitle: Πώς η Real Madrid κατάφερε το αδύνατον
Content: [Write full article in rich text editor]
Excerpt: Μια εκπληκτική εμφάνιση που άλλαξε τα δεδομένα...
Cover Image: [Upload image]
Journalist: [SELECT] Γιώργος Αντωνίου ← IMPORTANT!
Category: Ποδόσφαιρο
Tags: ["champions-league", "real-madrid", "uefa"]
Read Time: 8
Is Featured: ✅ true
```

Save & Publish!

### 5. View Your Blog!

- Visit: `http://localhost:3000`
- Scroll down → See "Οι Δημοσιογράφοι μας"
- Click journalist → See their profile + articles
- Click article → Read full content

## ✨ Features

### Homepage Integration
- Shows top 4 journalists
- Beautiful cards with hover effects
- "See All" link to full blog

### Blog Page
- Grid of all active journalists
- Filter by specialty
- Responsive design

### Journalist Profile Page
- Large avatar with bio
- Social media links
- Article count stats
- Grid of all their articles

### Article Reading Page
- Full-width cover image
- Rich text content with images
- Author card (clickable)
- Category & read time badges
- Share buttons (FB, X, Instagram)
- Tags
- Related articles from same journalist
- Breadcrumb navigation

## 🎯 Key Benefits

### For Content Editors:
✅ Easy to manage - just create journalists & articles
✅ Automatic linking - select journalist from dropdown
✅ No coding required
✅ Preview before publishing

### For Users:
✅ Discover journalists by specialty
✅ Follow favorite journalists
✅ Read all articles from one journalist
✅ Beautiful reading experience
✅ Share articles on social media

### For Developers:
✅ Clean separation of concerns
✅ Reusable components
✅ Type-safe with TypeScript
✅ Follows Next.js 14 best practices
✅ SEO-friendly with proper metadata

## 📊 Database Relationship Explained

### Simple Version:
```
Journalist "Νίκος" HAS MANY Articles
Article "Champions Analysis" BELONGS TO Journalist "Νίκος"
```

### Technical Version:
```sql
-- Journalists Table
id | name            | slug              | avatar
1  | Νίκος Παπαδόπ.  | nikos-papadop.    | /uploads/nikos.jpg

-- Blog Articles Table
id | title                  | slug              | journalist_id (FK)
1  | Champions Analysis     | champions-anal.   | 1
2  | Basketball Review      | basketball-rev.   | 1
3  | Formula 1 Insights     | formula1-ins.     | 1
```

The `journalist_id` is a **Foreign Key** that links each article to a journalist.

## 🎨 Customization Ideas

You can easily extend this system:

1. **Add Article Comments**: Create a comments collection type
2. **Add Likes/Reactions**: Track article engagement
3. **Add Newsletter**: Let users subscribe to journalists
4. **Add Search**: Search articles by title/content
5. **Add Categories Page**: Browse articles by category
6. **Add Tags Page**: Browse articles by tags

## 🎉 You're Done!

Your blog system is now complete with:
- ✅ Separate collection types (Journalists & Blog Articles)
- ✅ Proper relationships (One journalist → Many articles)
- ✅ Beautiful UI on all pages
- ✅ Full CMS integration
- ✅ Social sharing
- ✅ Responsive design

Start adding journalists and articles in Strapi CMS!

