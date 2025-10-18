# Sport Pages - Complete Structure

## ✅ All 3 Sport Pages Created!

Following the same clean, colocated structure for:
- ⚽ **Football**
- 🏀 **Basketball**
- 🏎️ **Formula 1**

---

## 📁 Consistent Structure

Each sport page follows the **exact same pattern**:

```
app/
├── football/
│   ├── page.tsx              # Main page component
│   ├── api.ts                # API utilities
│   ├── types.ts              # TypeScript interfaces
│   ├── _lib.ts               # Utility functions
│   └── FootballCard.tsx      # Card component
│
├── basketball/
│   ├── page.tsx              # Main page component
│   ├── api.ts                # API utilities
│   ├── types.ts              # TypeScript interfaces
│   ├── _lib.ts               # Utility functions
│   └── BasketballCard.tsx    # Card component
│
└── formula1/
    ├── page.tsx              # Main page component
    ├── api.ts                # API utilities
    ├── types.ts              # TypeScript interfaces
    ├── _lib.ts               # Utility functions
    └── Formula1Card.tsx      # Card component
```

---

## 🎨 Page Features

### All pages have:
- ✅ **Single column layout** with horizontal cards
- ✅ **Icon + Title** header (⚽ Ποδόσφαιρο, 🏀 Μπάσκετ, 🏎️ Formula 1)
- ✅ **Clean description** text
- ✅ **Scrollable article list**
- ✅ **Empty state** when no articles
- ✅ **Sport-specific colors**:
  - Football: Green (`bg-green-100 text-green-800`)
  - Basketball: Orange (`bg-orange-100 text-orange-800`)
  - Formula 1: Red (`bg-red-100 text-red-800`)

---

## 🎯 URLs

```
Football:    http://localhost:3000/football
Basketball:  http://localhost:3000/basketball
Formula 1:   http://localhost:3000/formula1
```

---

## 🎴 Card Components

Each sport has its own styled card:

### FootballCard
- **Image**: Left side (320px)
- **Badge**: Blue background
- **Hover**: Blue text color

### BasketballCard
- **Image**: Left side (320px)
- **Badge**: Orange background
- **Hover**: Orange text color

### Formula1Card
- **Image**: Left side (320px)
- **Badge**: Red background
- **Hover**: Red text color

---

## 🔧 API Functions

Each sport page has its own API with filtering:

```typescript
fetchFootballArticles(options)
fetchBasketballArticles(options)
fetchFormula1Articles(options)

Options:
- isCarousel?: boolean
- isMainNews?: boolean
- isHomeSportSection?: boolean
- limit?: number
```

---

## 📊 Data Flow

```
For each sport:

Strapi CMS
    ↓
API Endpoint (/api/[sport]-articles)
    ↓
api.ts (fetch + transform)
    ↓
page.tsx (render)
    ↓
[Sport]Card component
    ↓
User sees articles
```

---

## 🎭 Example Article Display

### Football Page:
```
┌────────────────────────────────────────┐
│  ⚽ Ποδόσφαιρο                          │
│  Όλα τα νέα και οι ειδήσεις...         │
├────────────────────────────────────────┤
│  ┌─────┐                               │
│  │ Img │  🟢 ΠΟΔΟΣΦΑΙΡΟ               │
│  │     │  Title of Article             │
│  └─────┘  Description text...          │
│           2h ago | By Author           │
├────────────────────────────────────────┤
│  ┌─────┐                               │
│  │ Img │  🟢 ΠΟΔΟΣΦΑΙΡΟ               │
│  │     │  Another Article              │
│  └─────┘  More text...                 │
│           5h ago | By Author           │
└────────────────────────────────────────┘
```

### Basketball Page:
```
┌────────────────────────────────────────┐
│  🏀 Μπάσκετ                            │
│  Όλα τα νέα και οι ειδήσεις...         │
├────────────────────────────────────────┤
│  ┌─────┐                               │
│  │ Img │  🟠 ΜΠΑΣΚΕΤ                  │
│  │     │  Title of Article             │
│  └─────┘  Description text...          │
│           1h ago | By Author           │
└────────────────────────────────────────┘
```

### Formula 1 Page:
```
┌────────────────────────────────────────┐
│  🏎️ Formula 1                          │
│  Όλα τα νέα και οι ειδήσεις...         │
├────────────────────────────────────────┤
│  ┌─────┐                               │
│  │ Img │  🔴 FORMULA 1                │
│  │     │  Title of Article             │
│  └─────┘  Description text...          │
│           3h ago | By Author           │
└────────────────────────────────────────┘
```

---

## 🚀 Build Output

```
✓ Compiled successfully

Routes:
┌ ○ /                  (homepage)
├ ○ /basketball        (new!)
├ ○ /football          (existing)
└ ○ /formula1          (new!)

All pages: 127 kB First Load JS
Revalidate: 1m (60 seconds)
```

---

## 📝 What's Colocated

Each sport page keeps everything together:

### Types (`types.ts`)
```typescript
StrapiBasketballArticle  // Strapi response type
BasketballArticle        // Frontend type
```

### Utilities (`_lib.ts`)
```typescript
STRAPI_URL              // API URL constant
getTimeAgo()            // Time calculation
getImageUrl()           // Image URL helper
transformArticle()      // Data transformation
```

### API (`api.ts`)
```typescript
fetchBasketballArticles()  // Fetch with filters
```

### Component (`BasketballCard.tsx`)
```typescript
BasketballCard            // Display component
```

### Page (`page.tsx`)
```typescript
BasketballPage            // Main page
```

---

## 🎯 Benefits of This Structure

### 1. **Easy to Find**
Want to change basketball page? Go to `app/basketball/`
Everything is there!

### 2. **Easy to Copy**
Need volleyball page? Copy basketball folder, rename, done!

### 3. **No Dependencies**
Each sport page is independent. Change one, others unaffected.

### 4. **Clear Separation**
- `types.ts` → What is the data?
- `api.ts` → How do we get data?
- `_lib.ts` → Helper functions
- `[Sport]Card.tsx` → How do we display it?
- `page.tsx` → Put it all together

### 5. **Consistent**
All 3 pages work the same way. Learn one, know all!

---

## 🔄 Integration with Homepage

Homepage pulls from all 3 sport APIs:

```typescript
// homepage-api.ts

fetchCarouselNews()
  ├─ Football (isCarousel=true)
  ├─ Basketball (isCarousel=true)
  └─ Formula1 (isCarousel=true)

fetchMainNews()
  ├─ Football (isMainNews=true)
  ├─ Basketball (isMainNews=true)
  └─ Formula1 (isMainNews=true)

fetchHomepageFootball()
  └─ Football (isHomeSportSection=true)

fetchHomepageBasketball()
  └─ Basketball (isHomeSportSection=true)

fetchHomepageFormula1()
  └─ Formula1 (isHomeSportSection=true)
```

---

## 📊 Strapi Backend

Each sport has its own content type:

```
Strapi Admin:
├── Football Article
│   Fields: title, description, author, image, slug
│   Flags: isCarousel, isMainNews, isHomeSportSection
│
├── Basketball Article
│   Fields: title, description, author, image, slug
│   Flags: isCarousel, isMainNews, isHomeSportSection
│
└── Formula1 Article
    Fields: title, description, author, image, slug
    Flags: isCarousel, isMainNews, isHomeSportSection
```

---

## ✨ Summary

**3 Sport Pages Created:**
- ✅ Football (`/football`)
- ✅ Basketball (`/basketball`)
- ✅ Formula 1 (`/formula1`)

**Each page has:**
- ✅ Same clean structure
- ✅ Colocated files (types, API, utils, component)
- ✅ Single column horizontal card layout
- ✅ Sport-specific styling
- ✅ Independent and maintainable

**Build Status:**
- ✅ All pages compile successfully
- ✅ No TypeScript errors
- ✅ No linting errors
- ✅ Ready for production!

---

**The complete sport pages system is now implemented and working!** 🎉

