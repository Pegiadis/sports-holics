# Internationalization (i18n) Guide

## Overview
This application now supports **Greek (el)** and **English (en)** languages, with **Greek as the default language**.

## Setup Summary

### Installed Packages
- `next-intl` - Modern i18n solution for Next.js App Router

### File Structure Changes

```
frontend/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── layout.tsx         # Locale layout with metadata
│   │   └── page.tsx           # Main page with translations
│   ├── layout.tsx             # Root layout
│   └── not-found.tsx          # 404 page
├── components/
│   ├── LanguageSwitcher.tsx   # Language switcher component
│   ├── Header.tsx             # Updated with translations
│   ├── Footer.tsx             # Updated with translations
│   ├── BreakingNews.tsx       # Updated with translations
│   ├── HeroSection.tsx        # Updated with translations
│   ├── Sidebar.tsx            # Updated with translations
│   └── NewsCarousel.tsx       # Updated
├── i18n/
│   └── request.ts             # i18n configuration
├── messages/
│   ├── el.json                # Greek translations
│   └── en.json                # English translations
├── middleware.ts              # Route middleware for locale detection
└── next.config.ts             # Updated with next-intl plugin
```

## How It Works

### 1. **URL Structure**
The application now uses locale-based URLs:
- Greek (default): `http://localhost:3000/el`
- English: `http://localhost:3000/en`

### 2. **Middleware**
The `middleware.ts` automatically:
- Detects the user's preferred language
- Redirects root URL (`/`) to the default locale (`/el`)
- Validates locale parameters

### 3. **Language Switcher**
A dropdown component in the header allows users to:
- See the current language (flag + code)
- Switch between Greek and English
- Visual feedback with rotation animation

### 4. **Translation Files**
All text content is stored in JSON files under `messages/`:
- `el.json` - Greek translations
- `en.json` - English translations

## Adding New Translations

### 1. Add to Translation Files

**messages/el.json:**
```json
{
  "newSection": {
    "title": "Νέος Τίτλος",
    "description": "Νέα Περιγραφή"
  }
}
```

**messages/en.json:**
```json
{
  "newSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 2. Use in Components

**Client Components:**
```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('newSection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Server Components:**
```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('newSection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Adding a New Language

1. **Add locale to config** (`i18n/request.ts`):
```typescript
export const locales = ['el', 'en', 'fr'] as const; // Add 'fr' for French
```

2. **Update middleware** (`middleware.ts`):
```typescript
export const config = {
  matcher: ['/', '/(el|en|fr)/:path*'] // Add 'fr'
};
```

3. **Create translation file**:
Create `messages/fr.json` with all translations

4. **Update LanguageSwitcher**:
Add the new language to the dropdown in `components/LanguageSwitcher.tsx`

## Testing

1. **Start the development server:**
```bash
cd frontend
npm run dev
```

2. **Access the site:**
- Greek: http://localhost:3000/el
- English: http://localhost:3000/en

3. **Test language switching:**
- Click the language dropdown in the header
- Select a different language
- Verify the content changes

## Key Features

✅ **Greek as default language** - Site loads in Greek by default
✅ **Seamless language switching** - No page reload required
✅ **SEO-friendly** - Each locale has its own URL
✅ **Type-safe translations** - TypeScript support for translation keys
✅ **Dynamic metadata** - Page title and description change with language
✅ **Responsive language switcher** - Works on all screen sizes

## Translation Coverage

The following components have been translated:
- ✅ Header navigation
- ✅ Footer
- ✅ Breaking News banner
- ✅ Hero Section
- ✅ Section titles (Football, Basketball, Formula 1)
- ✅ Sidebar headings
- ✅ Common buttons and labels
- ✅ Metadata (page title and description)

## Notes

- The middleware ensures all routes are prefixed with a locale
- Invalid locales automatically redirect to the 404 page
- The language switcher persists the current path when switching languages
- Translation files use nested objects for better organization

