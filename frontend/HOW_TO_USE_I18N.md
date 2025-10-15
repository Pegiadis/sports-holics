# 🌍 How to Use Internationalization

## Quick Access

### Start Your Site
```bash
cd frontend
npm run dev
```

### Access in Different Languages
- **Greek (Default)**: http://localhost:3000/el
- **English**: http://localhost:3000/en

## 🎯 Language Switcher Location

The language switcher is located in the **top right corner** of the header, next to the search and user profile icons.

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]  Football  Basketball  Formula 1  News  More         │
│                                        [🇬🇷 EL ▼] 🔍 👤     │
└─────────────────────────────────────────────────────────────┘
```

## 📖 Using the Language Switcher

### 1. Click the Language Dropdown
- Shows current language with flag
- Desktop: Shows flag + "EL" or "EN"
- Mobile: Shows flag only (responsive)

### 2. Select Your Language
```
┌──────────────────┐
│ 🇬🇷 Ελληνικά   ✓ │  ← Currently selected (Greek)
│ 🇬🇧 English      │
└──────────────────┘
```

### 3. Language Changes Instantly
- Content updates without page reload
- URL changes to reflect new language
- All navigation maintains selected language

## 🔤 What Changes When You Switch Languages

### Greek (Ελληνικά) Version:
```
🏠 Αρχική
⚽ Ποδόσφαιρο
🏀 Μπάσκετ
🏎️ Formula 1
📰 Νέα
➕ Περισσότερα

ΕΚΤΑΚΤΑ ΝΕΑ: ...

Footer:
- Σχετικά με εμάς
- Γρήγοροι Σύνδεσμοι
- Ακολουθήστε μας
```

### English Version:
```
🏠 Home
⚽ Football
🏀 Basketball
🏎️ Formula 1
📰 News
➕ More

BREAKING NEWS: ...

Footer:
- About Us
- Quick Links
- Follow Us
```

## 💡 Tips & Tricks

### For Users:
1. **Bookmarking**: Bookmark with your preferred language
   - Greek: `http://localhost:3000/el`
   - English: `http://localhost:3000/en`

2. **Sharing Links**: Share links with language included
   - The recipient will see the same language

3. **Search Engines**: Each language version is indexed separately

### For Developers:
1. **Testing**: Always test both languages after changes
   ```bash
   # Visit both URLs
   http://localhost:3000/el
   http://localhost:3000/en
   ```

2. **Adding Text**: Always add to BOTH translation files
   - `messages/el.json` (Greek)
   - `messages/en.json` (English)

3. **Common Pattern**:
   ```tsx
   "use client";
   import { useTranslations } from 'next-intl';
   
   export default function MyComponent() {
     const t = useTranslations('sectionName');
     return <h1>{t('key')}</h1>;
   }
   ```

## 🎨 Visual Example

### Header with Language Switcher

**Desktop View:**
```
┌──────────────────────────────────────────────────────────────┐
│                                                                │
│  [Sports Holics Logo]                                          │
│                                                                │
│  Football  Basketball  Formula 1  News  More  [🇬🇷 EL ▼] 🔍 👤 │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

**Mobile View:**
```
┌────────────────────────┐
│  [Logo]      [🇬🇷 ▼] │
│                        │
│  ☰ Menu                │
└────────────────────────┘
```

### Dropdown Open State:
```
                    ┌──────────────────┐
                    │ 🇬🇷 Ελληνικά   ✓ │  ← Current
                    │ 🇬🇧 English      │
                    └──────────────────┘
                    ↑
                [🇬🇷 EL ▼]
```

## 📱 Responsive Behavior

| Screen Size | Language Switcher Display |
|-------------|---------------------------|
| Desktop (>768px) | Flag + Code (🇬🇷 EL) |
| Mobile (<768px) | Flag only (🇬🇷) |

## 🔗 URL Structure

### Current URL Structure:
```
Before i18n:
http://localhost:3000/

After i18n:
http://localhost:3000/el/     ← Greek (default)
http://localhost:3000/en/     ← English
```

### Automatic Redirects:
- `http://localhost:3000/` → `http://localhost:3000/el/`
- Invalid locale → 404 page

## ✨ Features

✅ **No Page Reload**: Language changes instantly
✅ **URL Updates**: Browser history works correctly
✅ **Maintains Context**: Stays on current page when switching
✅ **Visual Feedback**: Current language highlighted with checkmark
✅ **Smooth Animation**: Dropdown rotates on open/close
✅ **Click Outside**: Closes dropdown when clicking elsewhere
✅ **Keyboard Accessible**: Can be used with keyboard navigation

## 🐛 Troubleshooting

### Language Switcher Not Showing?
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Ensure development server is running
- Check browser console for errors

### Wrong Language Showing?
- Check the URL - should start with `/el` or `/en`
- Try accessing directly: `http://localhost:3000/el`

### Translations Not Working?
- Verify both `el.json` and `en.json` have the same keys
- Check console for translation key errors
- Ensure component uses `useTranslations()` hook

## 🎓 Learning Resources

1. **Project Documentation**:
   - `I18N_QUICK_START.md` - Quick reference
   - `I18N_GUIDE.md` - Detailed guide
   - `I18N_IMPLEMENTATION_SUMMARY.md` - Technical details

2. **External Resources**:
   - [next-intl Documentation](https://next-intl-docs.vercel.app/)
   - [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

## 🎉 Enjoy Your Multilingual Site!

Your Sports Holics website now speaks both Greek and English fluently. Happy coding! 🚀

---

**Need Help?** Check the other documentation files or refer to the next-intl documentation.

