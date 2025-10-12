# Quick Reference - Sports Holics

## 🚀 Quick Start
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:3000

## 📁 Where to Find Things

| What | Where |
|------|-------|
| Add news data | `lib/newsData.ts` |
| Change colors | `app/globals.css` |
| Modify header | `components/Header.tsx` |
| Change carousel speed | `lib/constants.ts` (CAROUSEL_CONFIG) |
| Add new component | `components/YourComponent.tsx` |
| Update types | `types/index.ts` |
| Modify homepage | `app/page.tsx` |

## 🎨 Common Tasks

### Add a New News Article
```typescript
// lib/newsData.ts
export const mainNews: NewsArticle[] = [
  {
    category: "FOOTBALL",
    categoryColor: "bg-green-100 text-green-800",
    title: "Your Article Title",
    description: "Brief description...",
    timeAgo: "1 hour ago",
    author: "Author Name",
    imageUrl: "https://...",
  },
];
```

### Change Primary Color
```css
/* app/globals.css */
@theme inline {
  --color-primary: #your-color;
}
```

### Add Navigation Link
```typescript
// components/Header.tsx
<Link href="/your-page">Your Link</Link>
```

### Change Carousel Speed
```typescript
// lib/constants.ts
export const CAROUSEL_CONFIG = {
  autoRotateInterval: 3000, // milliseconds
  totalSlides: 3,
};
```

## 🧩 Component Usage

### NewsCard
```tsx
<NewsCard
  category="FOOTBALL"
  categoryColor="bg-green-100 text-green-800"
  title="Article Title"
  description="Brief description"
  timeAgo="2 hours ago"
  author="John Doe"
  imageUrl="https://..."
  size="medium"
/>
```

### Using Data
```tsx
import { mainNews } from "@/lib/newsData";

{mainNews.map((news, i) => (
  <NewsCard key={i} {...news} />
))}
```

## 🎯 TypeScript Types

```typescript
interface NewsArticle {
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  timeAgo: string;
  author: string;
  imageUrl: string;
}
```

## 📱 Responsive Breakpoints

| Breakpoint | Size | Tailwind |
|------------|------|----------|
| Mobile | < 768px | `(default)` |
| Tablet | 768px+ | `md:` |
| Desktop | 1024px+ | `lg:` |

## 🎨 Color Classes

| Category | Class |
|----------|-------|
| Primary | `bg-primary text-white` |
| Football | `bg-green-100 text-green-800` |
| Basketball | `bg-orange-100 text-orange-800` |
| Formula 1 | `bg-blue-100 text-blue-800` |

## 🛠️ Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run linter

# Troubleshooting
rm -rf .next        # Clear build cache
rm -rf node_modules # Remove dependencies
npm install         # Reinstall dependencies
```

## 📦 Import Aliases

```typescript
import Component from "@/components/Component"
import { data } from "@/lib/data"
import type { Type } from "@/types"
```

## 🎭 Animations

```css
/* Breaking news ticker */
.breaking-news {
  animation: scroll 30s linear infinite;
}

/* Card hover effect */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## 🔍 Key Files at a Glance

```
components/
  ├── Header.tsx          - Navigation
  ├── NewsCard.tsx        - Reusable card
  ├── NewsCarousel.tsx    - Auto-rotate carousel
  └── Footer.tsx          - Site footer

lib/
  ├── newsData.ts         - All news data
  └── constants.ts        - Config values

app/
  ├── page.tsx            - Homepage
  ├── layout.tsx          - Root layout
  └── globals.css         - Styles
```

## 💡 Tips

1. **Hot Reload**: Changes auto-update in browser
2. **Type Safety**: TypeScript catches errors before runtime
3. **Components**: Reuse NewsCard for consistency
4. **Images**: Use Next.js Image for optimization
5. **Data**: Update newsData.ts for content changes
6. **Colors**: Use constants.ts for category colors

## 🐛 Common Issues

**Port in use?**
```bash
npm run dev -- -p 3001
```

**Module not found?**
```bash
npm install
```

**Build error?**
```bash
rm -rf .next && npm run build
```

## 📚 Documentation

- Full docs: `README.md`
- Setup guide: `SETUP.md`
- Implementation: `IMPLEMENTATION_SUMMARY.md`
- This file: `QUICK_REFERENCE.md`

---

**Quick Links**:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

