# Sports Holics Frontend - Setup Guide

## Quick Start

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Overview

This is a modern sports news website built with:
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

## What Was Built

✅ **Complete Sports News Landing Page** with:
- Sticky header with navigation
- Breaking news ticker
- Hero section with featured story
- Auto-rotating news carousel
- Main news grid
- Sidebar with trending, live scores, and newsletter
- Category sections (Football, Basketball, Formula 1)
- Responsive footer

## File Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
│
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── BreakingNews.tsx     # News ticker
│   ├── HeroSection.tsx      # Hero banner
│   ├── NewsCard.tsx         # Reusable news card
│   ├── NewsCarousel.tsx     # Auto-rotating carousel
│   ├── Sidebar.tsx          # Sidebar with widgets
│   └── Footer.tsx           # Site footer
│
├── lib/
│   ├── newsData.ts          # Mock news data
│   └── constants.ts         # App constants
│
└── types/
    └── index.ts             # TypeScript types
```

## Key Features

### 1. **Component-Based Architecture**
All UI elements are broken into reusable components for easy maintenance.

### 2. **TypeScript Support**
Full type safety with interfaces for:
- NewsArticle
- TrendingNewsItem
- LiveScoreItem
- SocialIcon

### 3. **Responsive Design**
Mobile-first design that works on all screen sizes.

### 4. **Animations**
- Breaking news ticker (infinite scroll)
- Card hover effects
- Smooth carousel transitions

### 5. **Clean Code**
- Organized file structure
- Reusable components
- Separated data and logic
- Type-safe props

## Customization

### Change Colors
Edit `app/globals.css`:
```css
@theme inline {
  --color-primary: #ef4444;    /* Red */
  --color-secondary: #1e40af;  /* Blue */
}
```

### Add New News
Edit `lib/newsData.ts`:
```typescript
export const mainNews: NewsArticle[] = [
  {
    category: "FOOTBALL",
    categoryColor: "bg-green-100 text-green-800",
    title: "Your Title",
    description: "Your description...",
    timeAgo: "1 hour ago",
    author: "Author Name",
    imageUrl: "https://...",
  },
];
```

### Modify Navigation
Edit `components/Header.tsx` to add/remove menu items.

### Change Carousel Speed
Edit `components/NewsCarousel.tsx`:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Change 5000 to your desired milliseconds
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, 5000);
}, []);
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Server-Side Rendering**: Fast initial page loads
- **Optimized Images**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **CSS**: Tailwind CSS (purged in production)

## Next Steps

### Connect to Real API
Replace mock data in `lib/newsData.ts` with API calls:

```typescript
export async function getMainNews() {
  const res = await fetch('https://api.example.com/news');
  return res.json();
}
```

### Add More Features
- Search functionality
- User authentication
- Article detail pages
- Comments system
- Social sharing
- Dark mode
- Mobile menu
- Filters and sorting

### Deployment

**Vercel (Recommended)**:
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm run build
# Upload .next folder
```

## Troubleshooting

### Port already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Support

For issues or questions:
1. Check the main README.md
2. Review component documentation
3. Check Next.js docs: https://nextjs.org/docs

---

**Built with ❤️ using Next.js and Tailwind CSS**

