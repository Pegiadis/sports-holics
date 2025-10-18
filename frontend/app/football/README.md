# Football Page

Clean, simple football news page with colocation principles.

## Structure

```
football/
├── page.tsx          # Main page component
├── api.ts            # API utilities (colocated)
├── types.ts          # TypeScript interfaces
└── README.md         # This file
```

## Features

- ✅ Single column layout with NewsCard components
- ✅ Scrollable list of football articles
- ✅ Fetches from Strapi API (`/api/football-articles`)
- ✅ Fallback to empty state if no data
- ✅ Clean, readable, maintainable code

## Strapi Backend

Articles are managed in:
**Content Manager → Football Articles**

### Schema:
- **title** (string, required)
- **description** (text, required)
- **author** (string, required)
- **image** (media, optional)
- **slug** (UID, auto-generated from title)

## Data Flow

```
Strapi CMS
    ↓
api.ts (fetchFootballArticles)
    ├── Uses types from types.ts
    └── Transforms StrapiFootballArticle → FootballArticle
    ↓
page.tsx (FootballPage component)
    ↓
NewsCard component
    ↓
User sees article
```

## Usage

1. **Create article in Strapi:**
   - Go to `http://localhost:1337/admin`
   - Content Manager → Football Articles → Create
   - Fill in title, description, author, upload image
   - Click Publish

2. **View on frontend:**
   - Go to `http://localhost:3000/football`
   - Articles appear in single column, scrollable

## Future Enhancements

- [ ] Pagination
- [ ] Search/filter
- [ ] Categories (Premier League, La Liga, etc.)
- [ ] Article detail page

