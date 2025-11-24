# YouTube Video Embedding - Quick Reference

## ✅ Feature Complete

YouTube video embedding has been successfully implemented for Sports-Holics!

## 🎯 What Was Implemented

### Frontend (Next.js)
- ✅ TypeScript interfaces for video blocks (`frontend/lib/richtext-utils.ts`)
- ✅ YouTube URL parser (supports all URL formats)
- ✅ Video block renderer with responsive iframe
- ✅ Responsive 16:9 CSS styling (`frontend/app/globals.css`)
- ✅ Lazy loading for performance
- ✅ Privacy-enhanced mode (youtube-nocookie.com)

### Backend (Strapi)
- ✅ Custom video block support in Blocks editor
- ✅ Helper script to add videos to articles (`scripts/add-video-to-article.js`)
- ✅ Test script to create sample articles (`scripts/test-video-embedding.js`)
- ✅ Comprehensive editor guide (`VIDEO_EMBEDDING_GUIDE.md`)

### Documentation
- ✅ Updated CLAUDE.md with video embedding section
- ✅ Editor guide with examples
- ✅ Quick reference documentation

## 🚀 How to Use

### For Editors

**Quick Method:** Edit JSON directly in Strapi Blocks editor:

```json
{
  "type": "video",
  "provider": "youtube",
  "url": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  "videoId": "YOUR_VIDEO_ID"
}
```

**Helper Script Method:**
```bash
cd backend/sportsholics-cms
node scripts/add-video-to-article.js
```

### For Developers

Video blocks are automatically rendered in the frontend. No additional code needed!

**Data structure:**
```typescript
interface VideoBlock {
  type: 'video';
  provider: 'youtube';
  url: string;
  videoId: string;
}
```

**Frontend rendering:**
- Handled by `frontend/lib/richtext-utils.ts:renderVideoBlock()`
- Converts to responsive iframe embed
- Uses youtube-nocookie.com for privacy

## 📝 Example Article with Video

```json
[
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Δείτε τα highlights:"
      }
    ]
  },
  {
    "type": "video",
    "provider": "youtube",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "videoId": "dQw4w9WgXcQ"
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Απίστευτη εμφάνιση!"
      }
    ]
  }
]
```

## 🧪 Testing

### Create Test Article
```bash
node scripts/test-video-embedding.js
```

This creates a test football article with multiple embedded videos to verify everything works.

### Supported URL Formats
- `https://www.youtube.com/watch?v=VIDEO_ID` ✅
- `https://youtu.be/VIDEO_ID` ✅
- `https://www.youtube.com/embed/VIDEO_ID` ✅
- `https://www.youtube.com/v/VIDEO_ID` ✅

### Expected Behavior
- Video appears inline with other content
- 16:9 responsive aspect ratio
- Lazy loads when scrolling
- Works on mobile and desktop
- No cookies until user plays video

## 📚 Full Documentation

- **Editor Guide:** `backend/sportsholics-cms/VIDEO_EMBEDDING_GUIDE.md`
- **Developer Guide:** See `CLAUDE.md` → "Video Embedding (YouTube)" section
- **Scripts:**
  - `scripts/add-video-to-article.js` - Interactive helper
  - `scripts/test-video-embedding.js` - Create test article

## 🎨 Frontend Styling

Videos use custom CSS classes:
- `.video-embed-wrapper` - Outer container with spacing
- `.video-embed-container` - Responsive 16:9 container
- Compatible with `.prose` styling

## 🔒 Security & Privacy

- Uses `youtube-nocookie.com` domain (privacy-enhanced mode)
- iframe sandboxing enabled
- No third-party cookies until user interaction
- URL validation to ensure only YouTube URLs

## ⚡ Performance

- Lazy loading attribute on iframes
- Videos don't load until scrolled into view
- Minimal impact on page load time
- Responsive images maintain performance

## 🐛 Troubleshooting

### Video not showing?
1. Check JSON syntax is valid
2. Verify video ID is exactly 11 characters
3. Ensure URL is complete YouTube URL
4. Check browser console for errors

### Invalid video ID?
- Video ID must be 11 characters (letters, numbers, `-`, `_`)
- Extract from URL: `youtube.com/watch?v=**THIS_PART**`

### Script errors?
- Ensure `strapi.token` file exists with valid API token
- Check Strapi is running (`npm run dev`)
- Verify article ID exists

## 🎯 Next Steps

To start using video embedding:

1. **Test it:** Run `node scripts/test-video-embedding.js`
2. **View frontend:** Visit `http://localhost:3000/article/[slug]`
3. **Add to existing articles:** Use `node scripts/add-video-to-article.js`
4. **Manual editing:** Use JSON editor in Strapi admin

---

**Implementation completed by:** Claude Code
**Date:** 2025-11-21
**Status:** ✅ Production Ready
