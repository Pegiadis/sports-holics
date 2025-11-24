# YouTube Video Embedding Guide for Editors

## Overview

Sports-Holics supports embedding YouTube videos directly in article content. Videos will be responsive and display beautifully on all devices.

## Quick Start for Editors

### Method 1: Use the Raw JSON Editor (Recommended)

Since Strapi v5's Blocks editor doesn't have a built-in video button yet, you can add videos by editing the JSON directly:

1. **Create your article** in Strapi admin with regular text content
2. **Switch to JSON view** (there should be a "View JSON" or "Raw" toggle in the Blocks editor)
3. **Add a video block** anywhere in the JSON array:

```json
{
  "type": "video",
  "provider": "youtube",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "videoId": "VIDEO_ID"
}
```

4. **Save** and **Publish** the article
5. The video will appear on the frontend automatically

### Method 2: Using the Helper Script

We've created a helper script that adds videos to articles:

```bash
cd backend/sportsholics-cms
node scripts/add-video-to-article.js
```

Follow the prompts to:
- Enter article ID
- Enter YouTube URL
- Choose position (beginning, end, or specific index)

## YouTube URL Formats

All these URL formats are supported:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
https://www.youtube.com/embed/dQw4w9WgXcQ
https://www.youtube.com/v/dQw4w9WgXcQ
```

## Video Block Structure

### Full Video Block Example

```json
{
  "type": "video",
  "provider": "youtube",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "videoId": "dQw4w9WgXcQ"
}
```

### Complete Article Example with Video

```json
[
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Δείτε τα highlights από τον αγώνα:"
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
        "text": "Απίστευτη εμφάνιση από την ομάδα!"
      }
    ]
  }
]
```

## How to Get YouTube Video ID

### From YouTube Share Button:

1. Go to YouTube video
2. Click **Share** button below video
3. Copy the URL (e.g., `https://youtu.be/dQw4w9WgXcQ`)
4. The part after `/` is the video ID: `dQw4w9WgXcQ`

### From Browser URL:

If URL is: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
Video ID is: `dQw4w9WgXcQ` (the part after `v=`)

## Testing Videos

After adding a video block:

1. Save and publish the article in Strapi
2. View the article on the frontend
3. Video should appear as a responsive embed
4. Video should be lazy-loaded for performance
5. Works on mobile and desktop

## Troubleshooting

### Video Not Showing Up?

- **Check the JSON syntax**: Make sure the JSON is valid (no extra commas, brackets match)
- **Verify Video ID**: The video ID should be exactly 11 characters (letters, numbers, `-`, `_`)
- **Check URL format**: Use one of the supported YouTube URL formats
- **Clear cache**: Sometimes you need to refresh the frontend page

### Video ID Extraction Failed?

Make sure you're using the full URL, not just the video ID:
- ✅ `"url": "https://www.youtube.com/watch?v=abc123"`
- ❌ `"url": "abc123"`

### Invalid JSON Error?

- Check for missing commas between blocks
- Ensure all opening brackets `{` `[` have matching closing brackets `}` `]`
- Use a JSON validator online to check your JSON
- The video block should be inside the main array with other blocks

## Frontend Display

Videos will appear with:
- **16:9 responsive aspect ratio** (maintains ratio on all screen sizes)
- **Rounded corners** for modern look
- **Lazy loading** (video loads when user scrolls to it)
- **Privacy-enhanced mode** (uses `youtube-nocookie.com`)
- **Proper spacing** (matches other content blocks)

## Security & Privacy

- We use `youtube-nocookie.com` domain for privacy
- No tracking cookies until user plays the video
- Videos are sandboxed in iframes
- Only YouTube embeds are supported (for security)

## Future Enhancements

Planned features:
- Visual video button in Blocks editor UI
- Drag-and-drop video URL input
- Video thumbnail preview in editor
- Support for Vimeo and other platforms
- Auto-extract title from YouTube
- Custom start times (e.g., start at 1:23)

## Support

If you need help adding videos:
1. Check this guide first
2. Try the helper script
3. Contact the development team
4. Provide the article ID and YouTube URL you're trying to embed

---

**Happy video embedding! 🎥**
