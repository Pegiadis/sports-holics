# Visual Project Structure 🎨

## 📱 Frontend Pages

```
┌─────────────────────────────────────────────────┐
│                  HOMEPAGE                       │
│  ┌───────────────────────────────────────────┐ │
│  │  🔥 Carousel News (from carousel-news)    │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  ⭐ Main News (from main-news)            │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │  📰 Latest News (from latest-news)        │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             ⚽ FOOTBALL PAGE                     │
│  ┌───────────────────────────────────────────┐ │
│  │  Article 1 (NewsCard)                     │ │
│  ├───────────────────────────────────────────┤ │
│  │  Article 2 (NewsCard)                     │ │
│  ├───────────────────────────────────────────┤ │
│  │  Article 3 (NewsCard)                     │ │
│  ├───────────────────────────────────────────┤ │
│  │  Article 4 (NewsCard)                     │ │
│  └───────────────────────────────────────────┘ │
│  Scrollable list...                             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             🏀 BASKETBALL PAGE                   │
│  (Same structure as football)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             🏎️  FORMULA1 PAGE                   │
│  (Same structure as football)                   │
└─────────────────────────────────────────────────┘
```

---

## 🗂️ File Organization (Colocation)

### Traditional Approach (❌ Not Using)
```
src/
├── api/
│   ├── footballApi.ts       ← Far from page
│   ├── basketballApi.ts
│   └── formula1Api.ts
├── pages/
│   ├── football.tsx         ← API is elsewhere
│   ├── basketball.tsx
│   └── formula1.tsx
└── utils/
    └── transforms.ts        ← Scattered utilities
```
**Problem**: Files that change together are far apart!

---

### Our Approach (✅ Using Colocation)
```
app/
├── football/
│   ├── page.tsx           ← UI & rendering
│   ├── api.ts             ← Data fetching logic
│   ├── types.ts           ← TypeScript interfaces
│   └── README.md          ← Documentation
│
├── basketball/
│   ├── page.tsx
│   ├── api.ts
│   ├── types.ts
│   └── README.md
│
└── formula1/
    ├── page.tsx
    ├── api.ts
    ├── types.ts
    └── README.md
```
**Benefit**: Everything related to football is in `/football`!
**Clean separation**: Types, logic, and UI each in their own file!

---

## 🔄 Data Flow Visualization

```
Reporter Opens Strapi
        │
        ↓
Creates Football Article
        │
        ├─ Title: "Messi scores!"
        ├─ Description: "Amazing game..."
        ├─ Author: "John Doe"
        └─ Image: messi.jpg
        │
        ↓
Clicks "Publish"
        │
        ↓
┌───────────────────────┐
│   Strapi Database     │
│   Saves Article       │
└───────────────────────┘
        │
        ↓
API Endpoint Available:
/api/football-articles
        │
        ↓
┌───────────────────────┐
│  Frontend Requests    │
│  fetchFootballArticles│
└───────────────────────┘
        │
        ↓
┌───────────────────────┐
│  Transform Data       │
│  - Add timeAgo        │
│  - Fix image URLs     │
│  - Add category color │
└───────────────────────┘
        │
        ↓
┌───────────────────────┐
│  Render NewsCards     │
│  in Single Column     │
└───────────────────────┘
        │
        ↓
    User Sees Article!
```

---

## 🎯 Content Type Strategy

### One Content Type Per Page

```
┌─────────────────────────────────────────────┐
│  Strapi Content Types                       │
├─────────────────────────────────────────────┤
│                                             │
│  📁 football-article     → /football page   │
│  📁 basketball-article   → /basketball page │
│  📁 formula1-article     → /formula1 page   │
│                                             │
│  📁 carousel-news        → Homepage carousel│
│  📁 main-news            → Homepage main    │
│  📁 latest-news          → Homepage latest  │
│                                             │
└─────────────────────────────────────────────┘
```

**Why separate content types?**
- ✅ Clear and simple
- ✅ Each has its own management
- ✅ No complex filters needed
- ✅ Reporter knows exactly where to post

---

## 📊 Component Hierarchy

```
Page (football/page.tsx)
  │
  ├── Header
  │     ├── Logo
  │     └── Navigation
  │
  ├── Main Content
  │     └── Articles List
  │           ├── NewsCard 1
  │           │     ├── Image
  │           │     ├── Title
  │           │     ├── Description
  │           │     └── Meta (author, time)
  │           │
  │           ├── NewsCard 2
  │           ├── NewsCard 3
  │           └── NewsCard N...
  │
  └── Footer
        ├── Links
        └── Social Icons
```

---

## 🎨 NewsCard Component Sizes

```
┌──────────────────────────────────────┐
│         LARGE (h-64)                 │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │         Image                  │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│  CATEGORY                           │
│  Big Title Here                     │
│  Description text...                │
│  2h ago | By Author                 │
└──────────────────────────────────────┘

┌────────────────────────────┐
│   MEDIUM (h-48) ← Default  │
│  ┌──────────────────────┐  │
│  │     Image            │  │
│  └──────────────────────┘  │
│  CATEGORY                  │
│  Medium Title              │
│  Description...            │
│  2h ago | Author           │
└────────────────────────────┘

┌──────────────────────┐
│  SMALL (h-32)        │
│  ┌────────────────┐  │
│  │   Image        │  │
│  └────────────────┘  │
│  CAT                 │
│  Small Title         │
│  Short desc...       │
│  2h | Author         │
└──────────────────────┘

┌────────────────┐
│ XS (h-20)      │
│ ┌────────────┐ │
│ │  Img       │ │
│ └────────────┘ │
│ C              │
│ XS Title       │
│ Text...        │
│ 2h | A         │
└────────────────┘
```

**Football page uses: MEDIUM size**

---

## 🗄️ Database Structure

```
Strapi Database Tables:

┌─────────────────────────────┐
│  football_articles          │
├─────────────────────────────┤
│ id          INTEGER         │
│ documentId  STRING          │
│ title       STRING          │
│ description TEXT            │
│ author      STRING          │
│ slug        STRING (unique) │
│ image       RELATION        │
│ createdAt   DATETIME        │
│ publishedAt DATETIME        │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│  files (images)             │
├─────────────────────────────┤
│ id          INTEGER         │
│ name        STRING          │
│ url         STRING          │
│ size        INTEGER         │
│ mime        STRING          │
└─────────────────────────────┘
```

---

## 🚀 Deployment Flow

```
Development:
  ├── Strapi: localhost:1337
  └── Next.js: localhost:3000

Production:
  ├── Strapi: strapi.yourdomain.com
  │     └── Database: PostgreSQL/MySQL
  │
  └── Next.js: yourdomain.com
        ├── Vercel (recommended)
        └── API calls to Strapi
```

---

## 📱 Responsive Design

```
Mobile (< 768px):
┌─────────────┐
│   Header    │
├─────────────┤
│  Article 1  │
├─────────────┤
│  Article 2  │
├─────────────┤
│  Article 3  │
└─────────────┘

Tablet (768px - 1024px):
┌──────────────────────────┐
│        Header            │
├──────────────────────────┤
│  Article 1  │ Article 2  │
├──────────────────────────┤
│  Article 3  │ Article 4  │
└──────────────────────────┘

Desktop (> 1024px):
┌────────────────────────────────────┐
│           Header                   │
├────────────────────────────────────┤
│  Article  │  Article  │  Article   │
├────────────────────────────────────┤
│  Article  │  Article  │  Article   │
└────────────────────────────────────┘

Football page: Single column on all sizes!
```

---

## 🎓 Key Concepts

### 1. Colocation
```
Instead of:  api/ ← far away
            pages/football.tsx

We do:      football/
            ├── page.tsx
            └── api.ts ← together!
```

### 2. Separation of Concerns
```
page.tsx:  UI + Data fetching
api.ts:    API calls + Transformations
types.ts:  TypeScript interfaces
schema:    Data structure (Strapi)
```

**Clear responsibilities:**
- `types.ts` → What is the data?
- `api.ts` → How do we get the data?
- `page.tsx` → How do we show the data?

### 3. Fallback Strategy
```
Try Strapi → Success? ✅ Use data
          ↘ Fail? → Empty array []
```

---

This visual structure makes it easy to understand and explain the project! 🎉

