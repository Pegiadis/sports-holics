# Sports Holics - Frontend

A modern sports news website built with Next.js 15, React 19, and Tailwind CSS v4.

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata and RemixIcon CDN
│   ├── page.tsx            # Main home page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── BreakingNews.tsx    # Breaking news ticker
│   ├── HeroSection.tsx     # Hero section with featured story
│   ├── NewsCard.tsx        # Reusable news card component
│   ├── NewsCarousel.tsx    # Auto-rotating news carousel
│   ├── Sidebar.tsx         # Sidebar with trending, scores, newsletter
│   └── Footer.tsx          # Site footer
└── lib/
    └── newsData.ts         # Mock news data for the site
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Auto-rotating Carousel**: Hot news section with automatic slide rotation
- **Breaking News Ticker**: Animated scrolling news ticker
- **Component-based Architecture**: Clean, reusable components
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Card hover effects, smooth transitions, and professional design

## Components

### Header
Navigation bar with logo, menu items, and user actions (search, profile).

### BreakingNews
Animated ticker showing breaking sports news.

### HeroSection
Large hero section featuring the main story with background image.

### NewsCard
Reusable card component for displaying news articles with:
- Category badge
- Title and description
- Author and timestamp
- Responsive images
- Hover effects

Props:
- `category`: Category name
- `categoryColor`: Tailwind color classes
- `title`: Article title
- `description`: Article excerpt
- `timeAgo`: Publication time
- `author`: Author name
- `imageUrl`: Article image URL
- `size`: "small" | "medium" | "large"

### NewsCarousel
Auto-rotating carousel showing 5 news items with:
- Automatic rotation every 5 seconds
- Manual navigation with dots
- Responsive layout

### Sidebar
Contains three sections:
- **Trending Now**: Top 3 trending stories
- **Live Scores**: Real-time match scores
- **Newsletter**: Email subscription form

### Footer
Site footer with:
- Logo and description
- Sports links
- Company links
- Social media icons

## Styling

The project uses Tailwind CSS v4 with custom theme configuration:

- **Primary Color**: `#ef4444` (Red)
- **Secondary Color**: `#1e40af` (Blue)
- **Custom Button Radius**: `8px`

### Custom Animations

**Breaking News Ticker**:
```css
@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
```

**Card Hover Effect**:
```css
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

## Data Management

News data is stored in `lib/newsData.ts` with the following structure:

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

Available data arrays:
- `mainNews`: Main content grid articles
- `footballNews`: Football section articles
- `footballLatestNews`: Latest football news
- `basketballNews`: Basketball section articles
- `formulaOneNews`: Formula 1 section articles

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 15.5.4**: React framework with App Router
- **React 19.1.0**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript 5**: Type safety
- **RemixIcon 4.6.0**: Icon library

## Code Quality

- Clean, readable component structure
- TypeScript for type safety
- Reusable components
- Responsive design
- Accessibility features (aria-labels, semantic HTML)

## Future Enhancements

- Connect to real sports API
- Add search functionality
- Implement user authentication
- Add article detail pages
- Create mobile menu
- Add dark mode support
- Implement real-time score updates
- Add social sharing features
