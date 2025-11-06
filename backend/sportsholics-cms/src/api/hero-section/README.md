# Hero Section Collection Type

This collection type manages the homepage hero section content that displays prominently at the top of the homepage.

## Overview

The Hero Section allows content editors to control:
- Main headline and highlighted text
- Description text
- Background image
- Category badge (label and emoji)
- Call-to-action button (text and link)
- Stats display (views, comments, trending)
- Active status and priority

## Fields

### Required Fields
- **title** (string): Main headline text
- **description** (text): Full description paragraph
- **categoryLabel** (string): Category name (e.g., "Ποδόσφαιρο", "Μπάσκετ")
- **buttonText** (string): Text for the CTA button
- **backgroundImage** (media): Hero background image

### Optional Fields
- **titleHighlight** (string): Highlighted portion of the title (shown in red)
- **categoryEmoji** (string): Emoji for the category badge (default: "🔥")
- **timeAgo** (string): Timestamp text (default: "5 λεπτά πριν")
- **buttonLink** (string): URL for the CTA button (can be article slug like "/article/my-article")

### System Fields
- **isActive** (boolean): Set to true to show this hero section on the homepage
- **priority** (integer): Higher priority hero sections are shown first (when multiple are active)

## Usage

### Creating a Hero Section

1. Go to Strapi Admin Panel → Content Manager → Hero Section
2. Click "Create new entry"
3. Fill in the required fields:
   - Title: Your main headline
   - Description: Full article description
   - Category Label: Sport category
   - Button Text: CTA button text
   - Background Image: Upload hero image
4. Optionally customize:
   - Title Highlight: Part of title to highlight in red
   - Category Emoji: Change the emoji
   - Button Link: Add article link
5. Set **isActive** to `true` to enable
6. Set **priority** (higher = shown first)
7. Save and Publish

### Important Notes

- **Only one hero section displays at a time**: The system shows the active hero with the highest priority
- **Active flag**: Must be set to `true` for the hero to appear on the homepage
- **Priority**: If multiple heroes are active, the one with the highest priority shows
- **Default values**: All optional fields have sensible defaults matching the original design

## API Endpoint

**GET** `/api/hero-sections`

### Query Parameters
- `filters[isActive][$eq]=true` - Get only active heroes
- `sort[0]=priority:desc` - Sort by priority (highest first)
- `populate=backgroundImage` - Include the background image
- `pagination[limit]=1` - Get only one result

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Τελικός Champions League",
      "titleHighlight": "Έτοιμος για Επική Αναμέτρηση",
      "description": "Δύο γίγαντες του ποδοσφαίρου...",
      "categoryLabel": "Ποδόσφαιρο",
      "categoryEmoji": "🔥",
      "timeAgo": "5 λεπτά πριν",
      "buttonText": "Διαβάστε περισσότερα →",
      "buttonLink": "/article/champions-league-final",
      "isActive": true,
      "priority": 10,
      "backgroundImage": {
        "url": "/uploads/hero_image.jpg"
      }
    }
  ]
}
```

## Frontend Integration

The hero section is automatically fetched and displayed on the homepage. If no active hero exists, default values are used to ensure the page doesn't break.

**Location**: `frontend/components/HeroSection.tsx`
**API Function**: `frontend/app/homepage-api.ts` → `fetchHeroSection()`

## Tips for Content Editors

1. **Keep titles concise**: 2-3 lines maximum for best display
2. **Descriptions**: 2-3 sentences work best
3. **Images**: Use high-quality landscape images (recommended: 1920x600px)
4. **Test before publishing**: Use draft mode to preview
5. **Update regularly**: Fresh hero content keeps the homepage engaging
6. **Link to articles**: Use the buttonLink to direct users to related articles

## Troubleshooting

**Hero not showing on homepage?**
- Check that `isActive` is set to `true`
- Ensure the entry is Published (not Draft)
- Verify background image is uploaded

**Wrong hero showing?**
- Check the `priority` field - higher numbers show first
- Ensure only one hero has the highest priority

**Stats not showing?**
- Stats fields are optional - they'll only show if values are provided
- Default values are used if fields are empty

