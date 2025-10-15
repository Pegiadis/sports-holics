# 🌍 Internationalization Quick Start

## ✅ Setup Complete!

Your Sports Holics website now supports **Greek (Ελληνικά)** and **English** with Greek as the default language!

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd frontend
npm run dev
```

### 2. Access Your Site
- **Greek (Default)**: http://localhost:3000/el
- **English**: http://localhost:3000/en
- **Root URL**: Automatically redirects to `/el`

### 3. Switch Languages
Click the language dropdown in the header (shows flag + language code) to switch between Greek and English.

## 📁 Key Files

| File | Purpose |
|------|---------|
| `messages/el.json` | Greek translations |
| `messages/en.json` | English translations |
| `components/LanguageSwitcher.tsx` | Language switcher dropdown |
| `middleware.ts` | Handles locale routing |
| `i18n/request.ts` | i18n configuration |

## 🎯 What's Translated

✅ Header navigation menu
✅ Footer content and links
✅ Breaking news banner
✅ Hero section button
✅ Section headings (Football, Basketball, Formula 1, etc.)
✅ Sidebar titles
✅ Page metadata (title & description)
✅ Common buttons and labels

## 📝 How to Add New Translations

### Example: Add a new section

1. **Add to Greek translations** (`messages/el.json`):
```json
{
  "myNewSection": {
    "title": "Ο Νέος Τίτλος μου",
    "subtitle": "Υπότιτλος"
  }
}
```

2. **Add to English translations** (`messages/en.json`):
```json
{
  "myNewSection": {
    "title": "My New Title",
    "subtitle": "Subtitle"
  }
}
```

3. **Use in your component**:
```tsx
"use client";  // For client components

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('myNewSection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('subtitle')}</h2>
    </div>
  );
}
```

## 🎨 Language Switcher Features

- 🇬🇷 Greek flag and "EL" code
- 🇬🇧 English flag and "EN" code
- ✨ Smooth dropdown animation
- ✅ Visual indicator for current language
- 🔄 No page reload when switching
- 📱 Responsive on all screen sizes

## 🔧 Technical Details

- **Framework**: Next.js 15.5.4 with App Router
- **i18n Library**: next-intl
- **Default Locale**: Greek (`el`)
- **Supported Locales**: Greek (`el`), English (`en`)
- **Routing**: Locale prefix strategy (`/el/*`, `/en/*`)
- **Build**: Successfully builds with static page generation

## 🌐 Adding More Languages

To add a new language (e.g., French):

1. Create `messages/fr.json` with all translations
2. Update `i18n/request.ts`:
   ```typescript
   export const locales = ['el', 'en', 'fr'] as const;
   ```
3. Update `middleware.ts`:
   ```typescript
   matcher: ['/', '/(el|en|fr)/:path*']
   ```
4. Add to `LanguageSwitcher.tsx`:
   ```typescript
   { code: 'fr', name: 'Français', flag: '🇫🇷' }
   ```

## 📱 Test Your Changes

After making changes:
```bash
# Development mode (hot reload)
npm run dev

# Production build (test for errors)
npm run build

# Run production build locally
npm start
```

## ⚡ Performance

- Static generation for both locales
- Optimized bundle size
- Fast language switching (client-side)
- SEO-friendly URLs for each language

## 🎉 Success!

Your site is now fully bilingual! Users can seamlessly switch between Greek and English while enjoying a consistent, translated experience across all pages.

---

**Need help?** Check `I18N_GUIDE.md` for detailed documentation.

